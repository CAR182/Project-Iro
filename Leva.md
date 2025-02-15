import { useControls, button, folder } from 'leva';

useControls('Player', () => ({
playerSpeed: {
value: 8,
min: 1,
max: 10,
step: 1,
onChange: (v) => setSpeed(v),
},

folderExample: folder({ playerSpeed: {...} })
buttonExample: button({ fire: {...} })

}));
