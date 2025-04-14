import React, { useRef, useEffect, useState, useContext, Fragment } from 'react';
import { InputContext, GameContext, CollisionContext } from './Context';
import { Tile, collision, log, TILETYPES, INPUT } from 'Utils';
import { NPC, Item } from 'Spawn';
import styles from './App.module.css';

// TODO Given we can spawn NPCs and Tiles now, we can move the Tile logic to it's own class to keep things tidy.
function TileLayer({ name, tileData, offset, debug }) {
  const gameCtx = useContext(GameContext);
  const inputCtx = useContext(InputContext);
  const collisionCtx = useContext(CollisionContext);
  const canvasRef = useRef(null);
  const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.

  const [canvasCtx, setCanvas] = useState(null);
  const [tiles, setTiles] = useState([]); //TODO combine into single update call
  const [items, setItems] = useState([]);
  const [npcList, setNPCList] = useState([]);

  useEffect(() => {
    log(name, `Mount`);
    setCanvas(canvasRef.current.getContext('2d'));
    const processData = async () => {
      const data = await import('./data/' + tileData.src);
      processTiles(data.default);
    };
    processData();
  }, []);

  const processTiles = (data) => {
    //Collision Map
    const tileMap = [];
    for (let i = 0; i < data.length; i += tileData.width) {
      tileMap.push(data.slice(i, tileData.width + i));
    }

    const tiles = [];
    const npc = [];
    const items = [];

    tileMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        const tile = tileData.tiles[symbol];

        if (tile) {
          switch (tile.type) {
            case TILETYPES.NPC:
              npc.push(
                <NPC
                  key={symbol}
                  id={symbol}
                  config={tile}
                  path={tile.path}
                  interval={tile.interval}
                  position={{ x: j * gameCtx.tile.width + offset.x, y: i * gameCtx.tile.height + offset.y }}
                />
              );
              break;
            case TILETYPES.ITEM:
              items.push(
                <Item
                  key={symbol}
                  id={symbol}
                  config={tile}
                  position={{ x: j * gameCtx.tile.width + offset.x, y: i * gameCtx.tile.height + offset.y }}
                />
              );
              break;
            case TILETYPES.COLLISION:
            case TILETYPES.TRANSPORT:
              tiles.push(
                new Tile({
                  id: i * j,
                  type: tile.type,
                  position: {
                    x: j * gameCtx.tile.width + offset.x,
                    y: i * gameCtx.tile.height + offset.y,
                  },
                  dimensions: { width: gameCtx.tile.width, height: gameCtx.tile.height },
                  onCollision: tile.onCollision,
                  colour: tile.colour,
                })
              );

            default:
              break;
          }
        } else {
          log(name, `Unknown Symbol  [${symbol}]`);
        }
      });
    });
    log(
      name,
      `Processed Data: [${data.length}]
      Tiles:[${tiles.length}]
      Items:[${items.length}]
      NPCs:[${npc.length}] `
    );

    setTiles(tiles);
    setNPCList(npc);
    setItems(items);
  };

  useEffect(() => {
    if (canvasCtx) {
      if (inputCtx.evt) {
        canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
        updateLayer(tiles, inputCtx.evt);
        if (debug) tiles.forEach((tile) => tile.draw(canvasCtx));
      }
    }
  }, [gameCtx, inputCtx, canvasCtx]);

  function collisionCheck(tiles, offsetX, offsetY) {
    offsetX = offsetX / scale;
    offsetY = offsetY / scale;
    if (debug) {
      canvasCtx.strokeStyle = 'green';
      canvasCtx.strokeRect(
        gameCtx.player.x + offsetX,
        gameCtx.player.y + offsetY,
        gameCtx.player.width,
        gameCtx.player.height
      );
    }

    //TODO - Fix Bug with tiles moving
    //TODO - Reduce TileChecks by using playerPos to identify a boundbox
    for (let i = 0; i < tiles.length; i++) {
      let entry = tiles[i];
      if (
        collision(
          {
            position: { x: gameCtx.player.x + offsetX, y: gameCtx.player.y + offsetY },
            width: gameCtx.player.width,
            height: gameCtx.player.height,
          },
          {
            position: { x: entry.position.x, y: entry.position.y },
            width: gameCtx.tile.width,
            height: gameCtx.tile.height,
          } //Tile
        )
      ) {
        switch (entry.type) {
          case TILETYPES.TRANSPORT:
            collisionCtx.update(false, null);
            gameCtx.setLocation(entry.onCollision);
            break;
          case TILETYPES.INTERACTION:
          case TILETYPES.COLLISION:
            collisionCtx.update(true, entry.id);
            return; // If i've collided break out the loop, we don't need to keep
          default:
            break;
        }
      } else {
        if (collisionCtx.collided && collisionCtx.id == entry.id) {
          collisionCtx.update(false, null);
        }
      }
    }
  }
  // Player size = 30

  const updateLayer = (tiles) => {
    const val = 20;
    switch (inputCtx.evt) {
      case INPUT.W:
        collisionCheck(tiles, 0, -val);
        if (!collisionCtx.collided) tiles.forEach((tile) => (tile.position.y += gameCtx.moveSpeed));
        break;
      case INPUT.A:
        collisionCheck(tiles, -val, 0);
        if (!collisionCtx.collided) tiles.forEach((tile) => (tile.position.x += gameCtx.moveSpeed));
        break;
      case INPUT.S:
        collisionCheck(tiles, 0, val);
        if (!collisionCtx.collided) tiles.forEach((tile) => (tile.position.y -= gameCtx.moveSpeed));
        break;
      case INPUT.D:
        collisionCheck(tiles, val, 0);
        if (!collisionCtx.collided) tiles.forEach((tile) => (tile.position.x -= gameCtx.moveSpeed));
        break;
      default:
    }
  };

  return (
    gameCtx && (
      <Fragment>
        {npcList}
        {items}
        <canvas //TODO Move to TileList
          name={name}
          className={styles.canvas}
          ref={canvasRef}
          width={gameCtx.canvas.width}
          height={gameCtx.canvas.height}
        />
      </Fragment>
    )
  );
}

export default TileLayer;
