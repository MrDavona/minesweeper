import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBoardGridConfig } from "../configs/grid-config";
import { CellsComponent } from "./cells-component";
export class BoardView extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._cells = [];
    this._build();
  }

  getBounds() {
    return new Phaser.Rectangle(0, 0, 750, 750);
  }

  getGridConfig() {
    return getBoardGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  _onBtnClick() {
    this._cellsComponent.destroy();
    this._buildCells();
  }

  _build() {
    super.build(this.getGridConfig());
    // this._drawBounds();

    this._buildCells();
    this._buildButton();
  }

  _drawBounds() {
    const { x, y, width, height } = this.getBounds();

    const gr = this.game.add.graphics();
    gr.beginFill(0xff0000, 0.4);
    gr.drawRect(x, y, width, height);
    gr.endFill();

    this.setChild("cells", gr);
  }

  _buildCells() {
    this._cellsComponent = new CellsComponent(this.game);
    this.setChild("cells", this._cellsComponent);
  }

  _buildButton() {
    const btn = this.game.add.graphics();
    btn.beginFill(0x008cba, 1);
    btn.drawRoundedRect(-75, -40, 150, 80, 40);
    btn.endFill();
    btn.inputEnabled = true;
    btn.events.onInputDown.add(this._onBtnClick, this);

    const textStyle = { font: "bold 26px Arial", fill: "#ffffff" };
    const textArg = [0, 0, "Restart", textStyle];

    const text = this.game.add.text(...textArg);
    text.anchor.set(0.5);
    btn.addChild(text);

    this.setChild("button", (this._restartBtn = btn));
  }
}
