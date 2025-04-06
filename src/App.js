import React, { useState, useEffect } from 'react';
import { useControls } from 'leva';
import { InputContext, AppContext, DebugContext, debugDefaults } from './Context';
import InputController from './InputController';
import Game from './Game';
import AudioToggle from 'AudioToggle';
import KeyboardNav from 'KeyboardNav';
import styles from './App.module.css';

function App() {
  const [debugCtx, setDebugCtx] = useState(debugDefaults);

  const updateAppCtx = (key, value) => setAppCtx((prev) => ({ ...prev, [key]: value }));
  const [appCtx, setAppCtx] = useState({ update: updateAppCtx });

  const updateInput = (key, held) => setInputEvent((prev) => ({ ...prev, evt: key, held }));
  const [inputCtx, setInputEvent] = useState({ evt: null, setEvent: updateInput });

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
    <AppContext.Provider value={appCtx}>
      <InputContext.Provider value={inputCtx}>
        <div className={styles.App}>
          <div className={styles.container}>
            <DebugContext.Provider value={debugCtx}>
              <Game>
                <InputController />
              </Game>
            </DebugContext.Provider>
          </div>
          <div className={styles.btnContainer}>
            <KeyboardNav value={inputCtx.evt} />
            <AudioToggle value={appCtx.audio} clickHandler={(value) => updateAppCtx('audio', value)} />
          </div>
        </div>
      </InputContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
