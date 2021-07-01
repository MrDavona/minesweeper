import { LP } from "../utils";
import {
  getBoardGridLandscapeConfig,
  getBoardGridPortraitConfig
} from "./grid/board-grid-config";
import {
  getGameGridLandscapeConfig,
  getGameGridPortraitConfig
} from "./grid/game-grid-config";
import {
  getMainGridLandscapeConfig,
  getMainGridPortraitConfig
} from "./grid/main-grid-config";

export function getMainGridConfig() {
  return LP(getMainGridLandscapeConfig, getMainGridPortraitConfig).call(null);
}

export function getGameGridConfig() {
  return LP(getGameGridLandscapeConfig, getGameGridPortraitConfig).call(null);
}

export function getBoardGridConfig() {
  return LP(getBoardGridLandscapeConfig, getBoardGridPortraitConfig).call(null);
}
