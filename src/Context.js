import { createContext } from 'react';
import { LOCATIONS } from 'Utils';
const defaults = {
  moveSpeed: 5,
  canvas: { width: 1024, height: 576 },
  player: { x: 520, y: 310, width: 30, height: 30 },
  tile: { width: 64, height: 64 },
  //activeLocation: { map: LOCATIONS.TOWN, offset: { x: -260, y: -300 } },
  activeLocation: { map: LOCATIONS.PLAYER_2F, offset: { x: 375, y: -150 } },
};
const GameContext = createContext({});

const InputContext = createContext({
  evt: null,
  held: false,
  setEvent: () => {},
});

const CollisionContext = createContext({
  update: () => {},
  collided: false,
});
const InteractContext = createContext({ update: () => {}, active: false });

const DebugContext = createContext({});
const debugDefaults = { background: true, foreground: true, tiles: false, items: false };

export { InputContext, GameContext, CollisionContext, InteractContext, DebugContext, debugDefaults, defaults };
