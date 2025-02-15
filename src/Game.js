import React, { useRef, useEffect, useState, useCallback } from 'react';
import { InputContext, GameContext, CollisionContext, InteractContext, defaults } from './Context';
import { fade } from 'Utils';

import PalletTown from 'Locations/PalletTown';
import PlayerHouse from 'Locations/PlayerHouse';
import RivalHouse from 'Locations/RivalHouse';
import Bedroom from 'Locations/Bedroom';
import Lab from 'Locations/Lab';

import Overlay from 'Overlay';

function Game({ children }) {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef();

  const updateInput = (key, held) => setInputEvent((prev) => ({ ...prev, evt: key, held }));
  const updateInteraction = (active, text, id, img) =>
    setInteractionEvent((prev) => ({ ...prev, active, text, id, img }));
  const updateCollision = (value, id) => updateEvent((prev) => ({ ...prev, collided: value, id }));
  const updateLocation = (value) => {
    fade(canvasRef.current.getContext('2d'), 'OUT');
    setGameCtx((prev) => ({ ...prev, activeLocation: { map: value.destination, offset: value.position } }));
  };

  const [gameCtx, setGameCtx] = useState({ ...defaults, setLocation: updateLocation });
  const [collisionCtx, updateEvent] = useState({ collided: false, update: updateCollision });
  const [inputCtx, setInputEvent] = useState({ evt: null, setEvent: updateInput });
  const [interactionCtx, setInteractionEvent] = useState({
    active: false,
    text: '',
    id: null,
    img: null,
    update: updateInteraction,
  });

  // /* Primary Game Loop */
  const tick = useCallback(() => {
    gameLoopRef.current = requestAnimationFrame(tick);
    setGameCtx((prev) => ({ ...prev, frame: gameLoopRef.current }));
  });

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(tick);
    return () => {
      gameLoopRef.current && cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameLoopRef]);

  const render = () => {
    switch (gameCtx.activeLocation.map) {
      case 'PALLET_TOWN':
        return <PalletTown reference={gameCtx.activeLocation.map} position={gameCtx.activeLocation.offset} />;
      case 'PLAYER_HOUSE_1F':
        return <PlayerHouse reference='PLAYER_HOUSE_1F' position={gameCtx.activeLocation.offset} />;
      case 'PLAYER_HOUSE_2F':
        return <Bedroom reference='PLAYER_HOUSE_2F' position={gameCtx.activeLocation.offset} />;
      case 'RIVAL_HOUSE':
        return <RivalHouse reference='RIVAL_HOUSE' position={gameCtx.activeLocation.offset} />;
      case 'LAB':
        return <Lab reference='LAB' position={gameCtx.activeLocation.offset} />;
      default:
    }
  };

  return (
    <GameContext.Provider value={gameCtx}>
      <InputContext.Provider value={inputCtx}>
        <CollisionContext.Provider value={collisionCtx}>
          <InteractContext.Provider value={interactionCtx}>
            {children}
            {render()}
            {interactionCtx.active && <Overlay />}
            <canvas
              ref={canvasRef}
              name={'Transition'}
              style={{ position: 'absolute', backgroundColor: '#0000' }}
              width={gameCtx.canvas.width}
              height={gameCtx.canvas.height}
            />
          </InteractContext.Provider>
        </CollisionContext.Provider>
      </InputContext.Provider>
    </GameContext.Provider>
  );
}

export default Game;
