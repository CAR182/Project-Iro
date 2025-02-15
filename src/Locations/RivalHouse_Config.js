import { LOCATIONS, TILETYPES } from 'Utils';

const alphaTile = {
  type: TILETYPES.ITEM,
  src: '/images/Alpha_Tile.png',
};

export default {
  images: {
    background: '/images/RivalHouse/RivalHouse_BG.png',
    foreground: '/images/RivalHouse/RivalHouse_FG.png',
  },
  tileMap: {
    src: 'RivalHouse_TileMap.json',
    width: 10,
    height: 9,
    tiles: {
      5: { type: TILETYPES.COLLISION, colour: 'red' },
      86: { ...alphaTile, onCollision: { text: 'A Town Map' } },
      87: { ...alphaTile, onCollision: { text: "Hi ASH, GARY is out at Grandpa's lab" } },
      90: { ...alphaTile, onCollision: { text: 'Nothing happening out there ...' } },
      94: { ...alphaTile, onCollision: { text: "It's a big Map! This is useful!" } },
      3: {
        type: TILETYPES.TRANSPORT,
        onCollision: {
          destination: LOCATIONS.TOWN,
          position: { x: -775, y: -275 },
        },
      },
    },
  },
};
