import React, { Fragment, useContext } from 'react';
import { DebugContext } from 'Context';
import Player from '../Player';
import MapLayer from '../MapLayer';
import TileLayer from '../TileLayer';
import gameConfig from '../Config.json';
import config from './RivalHouse_Config';

export default ({ position }) => {
  const debugCtx = useContext(DebugContext);

  return (
    <Fragment>
      <MapLayer
        name={`PlayerHouse Background`}
        image={config.images.background}
        offset={position}
        visible={debugCtx.background}
      />
      <Player config={gameConfig.player} />
      <MapLayer
        name={`PlayerHouse Forground`}
        image={config.images.foreground}
        offset={position}
        visible={debugCtx.foreground}
      />
      <TileLayer name={`PlayerHouse TileMap`} tileData={config.tileMap} offset={position} visible={debugCtx.tiles} />
    </Fragment>
  );
};
