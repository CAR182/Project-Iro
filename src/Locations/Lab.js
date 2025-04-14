import React, { Fragment, useEffect, useContext, useRef } from 'react';
import { AppContext, DebugContext } from 'Context';
import Player from '../Player';
import MapLayer from '../MapLayer';
import TileLayer from '../TileLayer';
import gameConfig from '../Config.json';
import config from './Lab_Config';
import audioFile from '../assets/ResearchLab.mp3';

export default ({ position }) => {
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
    console.log('Lab AppCtx Changed:', appCtx);
    appCtx.audio ? audioRef.current.play() : audioRef.current.pause();
  }, [appCtx]);

  return (
    <Fragment>
      <audio src={audioFile} ref={audioRef} />

      <MapLayer
        name={`Oak's Lab  Background`}
        image={config.images.background}
        offset={position}
        debug={debugCtx.background}
      />
      <Player config={gameConfig.player} />
      <MapLayer
        name={`Oak's Lab  Forground`}
        image={config.images.foreground}
        offset={position}
        debug={debugCtx.foreground}
      />
      <TileLayer name={`Oak's Lab  TileMap`} tileData={config.tileMap} offset={position} debug={debugCtx.tiles} />
    </Fragment>
  );
};
