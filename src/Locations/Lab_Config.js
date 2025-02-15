import { LOCATIONS, TILETYPES } from 'Utils';

const alphaTile = {
  type: TILETYPES.ITEM,
  src: '/images/Alpha_Tile.png',
};

export default {
  images: {
    background: '/images/Lab/Lab_BG.png',
    foreground: '/images/Lab/Lab_FG.png',
  },
  tileMap: {
    src: 'Lab_TileMap.json',
    width: 12,
    height: 13,
    tiles: {
      898: { type: TILETYPES.COLLISION },
      1039: {
        ...alphaTile,
        onCollision: { text: 'There are 3 Pokemon there inside the Pokeballs. Go ahead, choose one!' },
      },
      1037: {
        ...alphaTile,
        onCollision: { text: 'Prof.Oak is the authority on Pokemon! Many Pokemon trainers hold him in high regard!' },
      },
      1036: {
        type: TILETYPES.NPC,
        src: {
          up: '/images/NPC/NPC_2_Up.png',
          down: '/images/NPC/NPC_2_Down.png',
        },
        frames: 3,
        onCollision: { text: "I study Pokemon as PROF.Oak's Aide" },
        path: ['KeyS', 'KeyW'],
        interval: 3000,
      },
      1038: { ...alphaTile, onCollision: { text: 'Bulbasaur!', img: '/images/Bulbasaur.png' } },
      1042: { ...alphaTile, onCollision: { text: 'Squirtle!', img: '/images/Squirtle.png' } },
      1043: { ...alphaTile, onCollision: { text: 'GARY: Yo ASH, Listen to Gramps!' } },
      1040: { ...alphaTile, onCollision: { text: 'Push START to open the Menu.' } },
      1044: { ...alphaTile, onCollision: { text: 'The save option is on the menu screen.' } },
      1045: { ...alphaTile, onCollision: { text: "It's encyclopedia like, but the pages are blank!" } },
      1041: { ...alphaTile, onCollision: { text: "It's encyclopedia like, but the pages are blank!" } },
      1032: { ...alphaTile, onCollision: { text: "I study Pokemon as PROF.Oak's Aide" } },
      1034: { ...alphaTile, onCollision: { text: 'Charmander!', img: '/images/Charmander.png' } },
      1035: { ...alphaTile, onCollision: { text: "There's an email here ..." } },

      896: {
        type: TILETYPES.TRANSPORT,
        onCollision: {
          destination: LOCATIONS.TOWN,
          position: { x: -715, y: -650 }, //TODO SET THIS
        },
      },
    },
  },
};
