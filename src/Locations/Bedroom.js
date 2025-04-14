import React, { Fragment, useEffect, useContext } from 'react';
import { DebugContext } from 'Context';
import Player from '../Player';
import MapLayer from '../MapLayer';
import TileLayer from '../TileLayer';
import gameConfig from '../Config.json';
import config from './Bedroom_Config.js';

export default ({ position }) => {
  const debugCtx = useContext(DebugContext);

  useEffect(() => {
    console.log('PlayerHouse_2F Mount');
  }, []);

  return (
    <Fragment>
      <MapLayer
        name={`Bedroom Background`}
        image={config.images.background}
        offset={position}
        debug={debugCtx.background}
      />
      <Player config={gameConfig.player} />
      <MapLayer
        name={'Bedroom Foreground'}
        image={config.images.foreground}
        offset={position}
        debug={debugCtx.foreground}
      />
      <TileLayer name={`Bedroom TileMap`} tileData={config.tileMap} offset={position} debug={debugCtx.tiles} />
    </Fragment>
  );
};
