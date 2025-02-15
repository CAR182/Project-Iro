import React, { useState, useEffect } from 'react';
import { useControls } from 'leva';
import { DebugContext, debugDefaults } from './Context';
import InputController from './InputController';
import Game from './Game';

import styles from './App.module.css';

function App() {
  const [debugCtx, setDebugCtx] = useState(debugDefaults);

  useEffect(() => {
    console.log('App Mount:', debugCtx);
  }, []);

  useControls(
    'Layer Visibility',
    () => ({
      foreground: {
        value: debugCtx.foreground,
        onChange: (v) => setDebugCtx((prev) => ({ ...prev, foreground: v })),
      },
      background: {
        value: debugCtx.background,
        onChange: (v) => setDebugCtx((prev) => ({ ...prev, background: v })),
      },
      tiles: {
        value: debugCtx.tiles,
        onChange: (v) => setDebugCtx((prev) => ({ ...prev, tiles: v })),
      },
      items: {
        value: debugCtx.items,
        onChange: (v) => setDebugCtx((prev) => ({ ...prev, items: v })),
      },
    }),
    { color: 'royalBlue' }
  );

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <DebugContext.Provider value={debugCtx}>
          <Game>
            <InputController />
          </Game>
        </DebugContext.Provider>
      </div>
    </div>
  );
}

export default App;
