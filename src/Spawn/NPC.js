import { useRef, useEffect, useState, useContext } from 'react';
import { GameContext } from 'Context';
import Sprite from 'Utils/Sprite';
import Base from 'Spawn/BaseSprite';

function NPC({ id, position, config, path = [], interval = 0 }) {
  useContext(GameContext);

  const [sprite, setSprite] = useState({ image: { width: 100, height: 100 } });
  const [value, setValue] = useState(0);
  const intervalRef = useRef(null);

  const startAnimation = () => {
    if (config.frames) {
      intervalRef.current = setInterval(() => {
        if (value < path.length - 1) {
          setValue((value) => value + 1);
        } else setValue(0);
      }, interval);
    }
  };

  useEffect(() => {
    let sprite;
    if (config.frames) {
      const directions = Object.keys(config.src).reduce((obj, currentValue) => {
        const img = new Image();
        img.src = config.src[currentValue];
        return { ...obj, [currentValue]: img };
      }, {});

      sprite = new Sprite({
        id,
        img: directions.down,
        frames: config.frames,
        directions,
      });
      startAnimation();
    } else {
      const img = new Image();
      img.src = config.src;
      sprite = new Sprite({
        id,
        img,
      });
    }
    setSprite(sprite);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Base
      id={'NPC'}
      dir={path[value]}
      sprite={sprite}
      position={{ x: position.x, y: position.y }}
      width={sprite.width}
      height={sprite.height}
      onCollision={config.onCollision}></Base>
  );
}

export default NPC;
