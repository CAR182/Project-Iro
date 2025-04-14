import { LOCATIONS, TILETYPES } from 'Utils';

const alphaTile = {
  type: 'ITEM',
  src: 'images/Alpha_Tile.png',
};

export default {
  images: {
    background: 'images/PlayerHouse/PlayerHouse_1F.png',
  },
  tileMap: {
    src: 'PlayerHouse_1F.json',
    width: 10,
    height: 9,
    tiles: {
      594: { type: TILETYPES.COLLISION },
      611: {
        ...alphaTile,
        onCollision: { text: "There's a movie on TV. Four boys are walking on railroad tracks. I better go too." },
      },
      612: {
        type: TILETYPES.NPC,
        src: 'images/Alpha_Tile.png',
        onCollision: {
          text: 'MOM: Right. All boys leave home someday. It said so on TV. PROF.OAK next door is looking for you.',
        },
      },
      592: {
        type: TILETYPES.TRANSPORT,
        colour: 'purple',

        onCollision: {
          destination: LOCATIONS.PLAYER_2F,
          position: { x: 50, y: 150 },
        },
      },
      590: {
        type: TILETYPES.TRANSPORT,
        colour: 'purple',

        onCollision: {
          destination: LOCATIONS.TOWN,
          position: { x: -260, y: -300 },
        },
      },
    },
  },
};
