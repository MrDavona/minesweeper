import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getGameGridConfig } from "../configs/grid-config";
import { BoardView } from "./board-view";
export class GameView extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._build();
  }

  getGridConfig() {
    return getGameGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  update() {
    //
  }

  _build() {
    super.build(this.getGridConfig());
    this._buildBoard();
  }

  _buildBoard() {
    this._boardView = new BoardView(this.game);
    this.setChild("board", this._boardView);
  }
}
