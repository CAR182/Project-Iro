import React, { Fragment, useContext } from 'react';
import { DebugContext } from 'Context';
import Player from '../Player';
import MapLayer from '../MapLayer';
import TileLayer from '../TileLayer';
import gameConfig from '../Config.json';
import config from './PlayerHouse_Config.js';

export default ({ position }) => {
  const debugCtx = useContext(DebugContext);

  return (
    <Fragment>
      <MapLayer
        name={`PlayerHouse BaseMap`}
        image={config.images.background}
        offset={position}
        debug={debugCtx.background}
      />
      <Player config={gameConfig.player} />
      <TileLayer name={`PlayerHouse TileMap`} tileData={config.tileMap} offset={position} debug={debugCtx.tiles} />
    </Fragment>
  );
};
