export function getBoardGridLandscapeConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "board",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "cells",
        bounds: { x: 0.25, y: 0, width: 0.75, height: 1 }
      },
      {
        name: "button",
        bounds: { x: 0, y: 0, width: 0.25, height: 1 }
      }
    ]
  };
}

export function getBoardGridPortraitConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "board",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "cells",
        bounds: { x: 0, y: 0.25, width: 1, height: 0.75 }
      },
      {
        name: "button",
        bounds: { x: 0, y: 0, width: 1, height: 0.25 }
      }
    ]
  };
}
