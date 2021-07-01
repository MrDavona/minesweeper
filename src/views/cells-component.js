import { BoardSize, BombCount, CellGap } from "../constants";
import { sampleSize } from "../utils";
import { CellComponent } from "./cell-component";

export class CellsComponent extends Phaser.Group {
  constructor(game) {
    super(game);

    this._cells = [];
    this._build();
  }

  _onCellClick(row, column) {
    const cell = this._findCell(row, column);
    this._checkForMine(cell);
  }

  _getOneDimensionalCellsArray() {
    const array = [];
    this._cells.forEach((row) => {
      array.push(...row);
    });

    return array;
  }

  _build() {
    this._buildCells();
    this._placeMines();
    this._numerate();
  }

  _buildCells() {
    const { row, column } = BoardSize;

    for (let i = 0; i < row; i++) {
      const row = [];
      for (let j = 0; j < column; j++) {
        const cell = new CellComponent(this.game, i, j);

        cell.position.set(j * CellGap, i * CellGap);
        cell.onclick.add(this._onCellClick, this);
        row.push(cell);

        this.addChild(cell);
      }
      this._cells.push(row);
    }
  }

  _findCell(row, column) {
    return this._getOneDimensionalCellsArray().find(
      (cell) => cell.row === row && cell.column === column
    );
  }

  _placeMines() {
    const arr = sampleSize(this._getOneDimensionalCellsArray(), BombCount);

    arr.forEach((cell) => {
      cell.placeMine();
    });
  }

  _numerate() {
    this._cells.forEach((row) => {
      row.forEach((cell) => {
        cell.hasMine() && this._numerateArea(cell);
      });
    });
  }

  _numerateArea(cell) {
    const { row, column } = cell;
    this._numerateCell(row - 1, column - 1);
    this._numerateCell(row - 1, column);
    this._numerateCell(row - 1, column + 1);
    this._numerateCell(row, column - 1);
    this._numerateCell(row, column + 1);
    this._numerateCell(row + 1, column - 1);
    this._numerateCell(row + 1, column);
    this._numerateCell(row + 1, column + 1);
  }

  _numerateCell(row, column) {
    const cell = this._findCell(row, column);
    cell && !cell.hasMine() && cell.addValue();
  }

  _disableAllCells() {
    this._getOneDimensionalCellsArray().forEach((cell) => {
      cell.disable();
    });
  }

  _revealBoard() {
    this._getOneDimensionalCellsArray().forEach((cell) => {
      cell.hasMine() && cell.reveal();
    });
  }

  _checkForMine(cell) {
    if (cell.hasMine()) {
      this._disableAllCells();
      this._revealBoard();
      cell.highlight();
    } else if (!cell.hasValue()) {
      this._revealEmptyCells(cell);
    } else {
      cell.reveal();
    }
  }

  _revealEmptyCells(cell) {
    const { row, column } = cell;

    cell.reveal();
    this._revealUpperCell(row - 1, column);
    this._revealDownCell(row + 1, column);
    this._revealLeftCell(row, column - 1);
    this._revealRightCell(row, column + 1);
  }

  _revealUpperCell(row, column) {
    const cell = this._findCell(row, column);

    if (cell && !cell.hasValue() && !cell.isRevealed()) {
      cell.reveal();
      this._revealUpperCell(row - 1, column);
      this._revealLeftCell(row, column - 1);
      this._revealRightCell(row, column + 1);
    } else if (cell && cell.hasValue()) {
      cell.reveal();
    } else {
      return;
    }
  }

  _revealDownCell(row, column) {
    const cell = this._findCell(row, column);

    if (cell && !cell.hasValue() && !cell.isRevealed()) {
      cell.reveal();
      this._revealDownCell(row + 1, column);
      this._revealLeftCell(row, column - 1);
      this._revealRightCell(row, column + 1);
    } else if (cell && cell.hasValue()) {
      cell.reveal();
    } else {
      return;
    }
  }

  _revealLeftCell(row, column) {
    const cell = this._findCell(row, column);

    if (cell && !cell.hasValue() && !cell.isRevealed()) {
      cell.reveal();
      this._revealLeftCell(row, column - 1);
      this._revealUpperCell(row - 1, column);
      this._revealDownCell(row + 1, column);
    } else if (cell && cell.hasValue()) {
      cell.reveal();
    } else {
      return;
    }
  }

  _revealRightCell(row, column) {
    const cell = this._findCell(row, column);

    if (cell && !cell.hasValue() && !cell.isRevealed()) {
      cell.reveal();
      this._revealRightCell(row, column + 1);
      this._revealUpperCell(row - 1, column);
      this._revealDownCell(row + 1, column);
    } else if (cell && cell.hasValue()) {
      cell.reveal();
    } else {
      return;
    }
  }
}
