import { useRef, useEffect, useState, useContext, useLayoutEffect } from 'react';
import { InputContext, GameContext, CollisionContext, InteractContext, DebugContext } from 'Context';
import styles from 'App.module.css';

import { INPUT, collision } from 'Utils/Utilities';

function BaseSprite({ id, sprite, position, width, height, onCollision, dir }) {
  const canvasRef = useRef(null);
  const [canvasCtx, setCanvas] = useState(null);

  const debugCtx = useContext(DebugContext);
  const gameCtx = useContext(GameContext);
  const inputCtx = useContext(InputContext);
  const collisionCtx = useContext(CollisionContext);
  const interactionCtx = useContext(InteractContext);

  const [collided, setCollided] = useState(false);

  const [pos, setPos] = useState({});

  useEffect(() => {
    setCanvas(canvasRef.current.getContext('2d'));
    setPos({ x: position.x, y: position.y });
  }, []);

  useLayoutEffect(() => {
    if (canvasCtx && sprite) {
      canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      if (!collisionCtx.collided & !sprite.static) {
        updateMovement(dir);
        sprite.animate(canvasCtx, 10);
      } else {
        sprite.draw(canvasCtx);
      }
    }
  }, [canvasCtx, gameCtx]);

  //Update Position
  useEffect(() => {
    if (inputCtx.evt) {
      update(inputCtx.evt);
    }
  }, [gameCtx, inputCtx]);

  function collisionCheck(offsetX, offsetY) {
    if (
      collision(
        {
          position: { x: gameCtx.player.x + offsetX, y: gameCtx.player.y + offsetY },
          width: gameCtx.player.width,
          height: gameCtx.player.height,
          //Player
        },
        {
          position: { x: pos.x, y: pos.y },
          width,
          height,
        } //Tile
      )
    ) {
      collisionCtx.update(true, sprite.id);
      setCollided(true);
    } else {
      if (collided) {
        if (collisionCtx.collided && collisionCtx.id == sprite.id) collisionCtx.update(false);
        if (interactionCtx.active && interactionCtx.id) interactionCtx.update(false);
      }
      setCollided(false);
    }
  }

  const updateMovement = (dir) => {
    sprite.isMoving = true;
    switch (dir) {
      case INPUT.W:
        setPos((prev) => ({ ...prev, y: (prev.y -= 0.1) }));
        sprite.image = sprite.directions.up;
        break;
      case INPUT.A:
        setPos((prev) => ({ ...prev, x: (prev.x -= 0.1) }));
        sprite.image = sprite.directions.left;
        break;
      case INPUT.S:
        setPos((prev) => ({ ...prev, y: (prev.y += 0.1) }));
        sprite.image = sprite.directions.down;
        break;
      case INPUT.D:
        setPos((prev) => ({ ...prev, x: (prev.x += 0.1) }));
        sprite.image = sprite.directions.right;
        break;
      default:
        sprite.isMoving = false;
    }
  };

  const update = (input) => {
    switch (input) {
      case INPUT.W:
        collisionCheck(0, -10);
        if (!collisionCtx.collided) setPos((prev) => ({ ...prev, y: (prev.y += gameCtx.moveSpeed) }));
        break;
      case INPUT.A:
        collisionCheck(-10, 0);
        if (!collisionCtx.collided) setPos((prev) => ({ ...prev, x: (prev.x += gameCtx.moveSpeed) }));
        break;
      case INPUT.S:
        collisionCheck(0, 10);
        if (!collisionCtx.collided) setPos((prev) => ({ ...prev, y: (prev.y -= gameCtx.moveSpeed) }));
        break;
      case INPUT.D:
        collisionCheck(10, 0);
        if (!collisionCtx.collided) setPos((prev) => ({ ...prev, x: (prev.x -= gameCtx.moveSpeed) }));
        break;
      case INPUT.Space:
        if (collided) {
          interactionCtx.update(true, onCollision.text, sprite.id, onCollision.img);
        }
        break;
      default:
    }
  };

  return (
    <canvas
      name={id}
      ref={canvasRef}
      className={[styles.canvas, debugCtx.items && styles.debugCanvas, styles.sprite].join(' ')}
      style={{ top: pos.y, left: pos.x }}
      width={width}
      height={height}
    />
  );
}

export default BaseSprite;
