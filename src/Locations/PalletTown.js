import React, { Fragment, useEffect, useContext, useRef } from 'react';
import { AppContext, DebugContext } from 'Context';
import MapLayer from '../MapLayer';
import TileLayer from '../TileLayer';
import Player from '../Player';
import gameConfig from '../Config.json';
import config from './PalletTown_Config.js';
import audioFile from '../assets/PalletTown.mp3';

function PalletTown({ position }) {
  const appCtx = useContext(AppContext);

  const debugCtx = useContext(DebugContext);
  const audioRef = useRef();

  useEffect(() => {
    document.addEventListener('keydown', () => {
      if (appCtx.audio & audioRef.current) audioRef.current.play();
    });

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    console.log('dAudio:', appCtx.audio);
    appCtx.audio ? audioRef.current.play() : audioRef.current.pause();
  }, [appCtx]);

  return (
    <Fragment>
      <audio src={audioFile} ref={audioRef} />
      <MapLayer
        name={'PalletTown Background'}
        image={config.images.background}
        offset={position}
        debug={debugCtx.background}
      />
      <Player config={gameConfig.player} />
      <MapLayer
        name={'PalletTown Foreground'}
        image={config.images.foreground}
        offset={position}
        debug={debugCtx.foreground}
      />
      <TileLayer name={'PalletTown TileMap'} tileData={config.tileMap} offset={position} debug={debugCtx.tiles} />
    </Fragment>
  );
}

export default PalletTown;
