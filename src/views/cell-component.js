import { CellSize } from "../constants";

export class CellComponent extends Phaser.Group {
  constructor(game, row, column) {
    super(game);
    this._mine = null;
    this._value = 0;
    this._row = row;
    this._column = column;
    this._isRevealed = false;
    this.onclick = new Phaser.Signal();

    this._buildCell();
    this.enable();
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }

  hasMine() {
    return this._mine;
  }

  hasValue() {
    return this._value !== 0;
  }

  isRevealed() {
    return this._isRevealed;
  }

  enable() {
    this._cell.inputEnabled = true;
    this._cell.events.onInputDown.add(() => {
      this.onclick.dispatch(this._row, this._column);
    });
  }

  disable() {
    this._cell.inputEnabled = false;
  }

  highlight() {
    this._cell.tint = 0x777777;
  }

  reveal() {
    this._isRevealed = true;
    this._cell.tint = 0xcfcfcf;

    this._mine && this.bringToTop(this._mine);
    this._text && this.bringToTop(this._text);
  }

  placeMine() {
    this._mine = this.game.add.graphics();
    this._mine.lineStyle(2, 0x000000, 1);
    this._mine.beginFill(0x000000, 1);
    this._mine.drawCircle(this._cell.centerX, this._cell.centerY, 20);
    this._mine.endFill();

    this.addChild(this._mine);
    this.bringToTop(this._cell);
  }

  addValue() {
    this._value += 1;
    this._text && this._text.destroy();

    const { centerX, centerY } = this._cell;
    const textStyle = { font: "bold 32px Arial", fill: "#ffffff" };
    const textArg = [centerX, centerY, `${this._value}`, textStyle];

    this._text = this.game.add.text(...textArg);
    this._text.anchor.set(0.5);

    this.addChild(this._text);
    this.bringToTop(this._cell);
  }

  _buildCell() {
    this._cell = this.game.add.graphics();
    this._cell.lineStyle(2, 0x808080, 1);
    this._cell.beginFill(0xc6c6c6, 1);
    this._cell.drawRect(0, 0, CellSize, CellSize);
    this._cell.endFill();

    this.addChild(this._cell);
  }
}
