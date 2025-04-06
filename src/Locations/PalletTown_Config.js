import { LOCATIONS, TILETYPES } from 'Utils';

const alphaTile = {
  type: TILETYPES.ITEM,
  src: 'images/Alpha_Tile.png',
};

export default {
  images: {
    background: 'images/PalletTown/PalletTown_BG.png',
    foreground: 'images/PalletTown/PalletTown_FG.png',
  },
  tileMap: {
    src: 'PalletTown_TileMap.json',
    width: 33,
    height: 24,
    tiles: {
      5: { type: TILETYPES.COLLISION, colour: 'red' },
      24: { type: TILETYPES.COLLISION, colour: 'red' },
      17: {
        type: TILETYPES.NPC,
        src: {
          up: 'images/NPC/NPC_1_Up.png',
          down: 'images/NPC/NPC_1_Down.png',
          left: 'images/NPC/NPC_1_Left.png',
          right: 'images/NPC/NPC_1_Right.png',
        },
        frames: 3,
        onCollision: { text: "I'm raising Pokemon too! When they get strong they can protect me!" },
        path: ['KeyA', 'KeyD'],
        interval: 3000,
      },
      18: {
        type: TILETYPES.NPC,
        src: 'images/Alpha_Tile.png',
        onCollision: {
          text: 'Technology is incredible. You can now store and recall items and Pokemon as data via PC! ',
        },
      },
      31: {
        ...alphaTile,
        onCollision: {
          text: 'Sorry, this is the end, nothing exists beyond this point as the developer was too lazy to expand. Maybe one day!',
        },
      },
      22: { ...alphaTile, onCollision: { text: "ASH's House." } },
      26: { ...alphaTile, onCollision: { text: "GARY's House." } },
      30: { ...alphaTile, onCollision: { text: 'PALLET TOWN Shades of your journey await!' } },
      27: { ...alphaTile, onCollision: { text: "PROF.OAK's Pokemon Research Lab" } },
      1: {
        type: TILETYPES.TRANSPORT,
        onCollision: {
          destination: LOCATIONS.PLAYER_1F,
          position: { x: 275, y: -110 },
        },
      },
      3: {
        type: TILETYPES.TRANSPORT,
        onCollision: {
          destination: LOCATIONS.RIVAL,
          position: { x: 275, y: -150 },
        },
      },
      8: {
        type: TILETYPES.TRANSPORT,
        onCollision: {
          destination: LOCATIONS.LAB,
          position: { x: 150, y: -430 },
        },
      },
    },
  },
};
