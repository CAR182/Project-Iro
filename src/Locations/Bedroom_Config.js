import { LOCATIONS, TILETYPES } from 'Utils';

const alphaTile = {
  type: TILETYPES.ITEM,
  src: 'images/Alpha_Tile.png',
};

export default {
  images: {
    background: 'images/PlayerHouse/PlayerHouse_2F_BG.png',
    foreground: 'images/PlayerHouse/PlayerHouse_2F_FG.png',
  },
  tileMap: {
    src: 'PlayerHouse_2F.json',
    width: 10,
    height: 9,
    tiles: {
      898: { type: TILETYPES.COLLISION },
      896: {
        type: TILETYPES.TRANSPORT,
        onCollision: {
          destination: LOCATIONS.PLAYER_1F,
          position: { x: 0, y: 150 },
        },
      },
      1043: { ...alphaTile, onCollision: { text: "ASH is playing the SNES!...Okey! It's time to go!" } },
      1047: { ...alphaTile, onCollision: { text: "This PC doesn't appear to be working..." } },
    },
  },
};
