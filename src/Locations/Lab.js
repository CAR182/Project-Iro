import React, { Fragment, useEffect, useContext, useRef } from 'react';
import { DebugContext } from 'Context';
import Player from '../Player';
import MapLayer from '../MapLayer';
import TileLayer from '../TileLayer';
import gameConfig from '../Config.json';
import config from './Lab_Config';
import audioFile from '../assets/ResearchLab.mp3';

export default ({ position }) => {
  const debugCtx = useContext(DebugContext);
  const audioRef = useRef();

  useEffect(() => {
    document.addEventListener('keydown', () => {
      if (audioRef.current) audioRef.current.play();
    });

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <Fragment>
      <audio src={audioFile} ref={audioRef} />

      <MapLayer
        name={`Oak's Lab  Background`}
        image={config.images.background}
        offset={position}
        visible={debugCtx.background}
      />
      <Player config={gameConfig.player} />
      <MapLayer
        name={`Oak's Lab  Forground`}
        image={config.images.foreground}
        offset={position}
        visible={debugCtx.foreground}
      />
      <TileLayer name={`Oak's Lab  TileMap`} tileData={config.tileMap} offset={position} visible={debugCtx.tiles} />
    </Fragment>
  );
};
