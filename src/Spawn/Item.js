import { useEffect, useState, useContext } from 'react';
import { GameContext } from 'Context';
import Sprite from 'Utils/Sprite';
import Base from 'Spawn/BaseSprite';

function Item({ id, position, config }) {
  useContext(GameContext);
  const [sprite, setSprite] = useState({ image: { width: 100, height: 100 } });

  useEffect(() => {
    console.log(`Item [${id}] Mount: ${config.src}`);
    // Image
    const item = new Image();
    item.src = config.src;
    const sprite = new Sprite({
      id,
      img: item,
    });

    setSprite(sprite);
  }, []);

  return (
    <Base
      id={'Item'}
      sprite={sprite}
      position={{ x: position.x, y: position.y }}
      width={sprite.width}
      height={sprite.height}
      onCollision={config.onCollision}></Base>
  );
}

export default Item;
