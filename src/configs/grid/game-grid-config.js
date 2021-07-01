export function getGameGridLandscapeConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "game",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "board",
        bounds: { x: 0, y: 0.25, width: 1, height: 0.75 }
      }
    ]
  };
}

export function getGameGridPortraitConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "game",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "board",
        bounds: { x: 0, y: 0.25, width: 1, height: 0.75 }
      }
    ]
  };
}
