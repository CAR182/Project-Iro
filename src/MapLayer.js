import React, { useRef, useEffect, useState, useContext } from 'react';
import { InputContext, GameContext, CollisionContext } from './Context';

import Layer from './Utils/Layer';
import { log, INPUT } from 'Utils';

import styles from './App.module.css';

function MapLayer({ name, image, offset, debug }) {
  const gameCtx = useContext(GameContext);
  const inputCtx = useContext(InputContext);
  const collisionCtx = useContext(CollisionContext);
  const [layer, setLayer] = useState(null);
  const canvasRef = useRef(null);
  const [canvasCtx, setCanvas] = useState(null);

  useEffect(() => {
    log(name, `Map Mount: ${image}`);
    setCanvas(canvasRef.current.getContext('2d'));

    const img = new Image();
    img.src = image;
    img.onload = function () {
      setLayer(new Layer({ position: { x: offset.x, y: offset.y }, img }));
    };
  }, []);

  useEffect(() => {
    if (canvasCtx && layer) {
      if (debug) layer.draw(canvasCtx);
    }
  }, [canvasCtx]);

  useEffect(() => {
    if (canvasCtx && layer) {
      if (inputCtx.evt) updateLayer();
      if (debug) layer.draw(canvasCtx);
      else canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    }
  }, [gameCtx, inputCtx, canvasCtx]);

  const updateLayer = () => {
    switch (inputCtx.evt) {
      case INPUT.W:
        if (!collisionCtx.collided) layer.position.y += gameCtx.moveSpeed;
        break;
      case INPUT.A:
        if (!collisionCtx.collided) layer.position.x += gameCtx.moveSpeed;
        break;
      case INPUT.S:
        if (!collisionCtx.collided) layer.position.y -= gameCtx.moveSpeed;
        break;
      case INPUT.D:
        if (!collisionCtx.collided) layer.position.x -= gameCtx.moveSpeed;
        break;
      default:
    }
  };

  return (
    gameCtx && (
      <canvas
        name={name}
        className={styles.canvas}
        ref={canvasRef}
        width={gameCtx.canvas.width}
        height={gameCtx.canvas.height}
      />
    )
  );
}

export default MapLayer;
