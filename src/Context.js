import { createContext } from 'react';
import { LOCATIONS } from 'Utils';
const defaults = {
  moveSpeed: 5,
  canvas: { width: 1024, height: 576 },
  player: { x: 1024 / 2, y: 576 / 2, width: 50, height: 50 },
  tile: { width: 64, height: 64 },
  //activeLocation: { map: LOCATIONS.TOWN, offset: { x: -260, y: -300 } },
  activeLocation: { map: LOCATIONS.PLAYER_2F, offset: { x: 375, y: -150 } },
};
const AppContext = createContext({
  update: () => {},
  audio: false,
});

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

export {
  AppContext,
  InputContext,
  GameContext,
  CollisionContext,
  InteractContext,
  DebugContext,
  debugDefaults,
  defaults,
};
