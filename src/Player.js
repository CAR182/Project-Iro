import { useRef, useEffect, useState, useContext, useLayoutEffect } from 'react';
import { InputContext, GameContext, CollisionContext } from './Context';
import styles from './Player.module.css';
import { Sprite, INPUT } from 'Utils';

function Player({ config }) {
  const gameCtx = useContext(GameContext);
  const inputCtx = useContext(InputContext);
  const collisionCtx = useContext(CollisionContext);
  const [sprite, setSprite] = useState({ image: { width: 1, height: 1 } });

  const canvasRef = useRef(null);
  const [canvasCtx, setCanvas] = useState(null);

  useEffect(() => {
    console.log('Player Mount');
    setCanvas(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    // Player Image
    const directions = Object.keys(config.src).reduce((obj, currentValue) => {
      const img = new Image();
      img.src = config.src[currentValue];
      return { ...obj, [currentValue]: img };
    }, {});

    const sprite = new Sprite({
      img: directions.down,
      frames: config.frames,
      directions,
    });

    setSprite(sprite);
  }, []);

  useLayoutEffect(() => {
    if (canvasCtx && sprite) {
      sprite.draw(canvasCtx); //1st Draw
      canvasCtx.canvas.style.left = `${gameCtx.canvas.width / 2}px`; // Center Player Canvas correctly - TODO Get these values from config
      canvasCtx.canvas.style.top = `${gameCtx.canvas.height / 2}px`;
      if (inputCtx.evt) {
        setDirection(inputCtx.evt);

        if (!collisionCtx.collided) {
          sprite.animate(canvasCtx, 8);
        }
      }
    }
  }, [canvasCtx, gameCtx, inputCtx, collisionCtx]);

  const setDirection = (dir) => {
    sprite.isMoving = true;
    switch (dir) {
      case INPUT.W:
        sprite.image = sprite.directions.up;
        break;
      case INPUT.A:
        sprite.image = sprite.directions.left;
        break;
      case INPUT.S:
        sprite.image = sprite.directions.down;
        break;
      case INPUT.D:
        sprite.image = sprite.directions.right;
        break;
      default:
        sprite.isMoving = false;
    }
  };

  return (
    gameCtx && (
      <canvas
        name={'Player'}
        ref={canvasRef}
        className={[styles.player, styles.canvas].join(' ')}
        width={sprite.width}
        height={sprite.height}
      />
    )
  );
}

export default Player;
