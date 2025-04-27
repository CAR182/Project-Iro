import React, { useState, useEffect } from 'react';
import { useControls } from 'leva';
import { InputContext, AppContext, DebugContext, debugDefaults } from './Context';
import InputController from './InputController';
import Game from './Game';
import AudioToggle from 'AudioToggle';
import DebugToggle from 'DebugToggle';
import KeyboardNav from 'KeyboardNav';
import styles from './App.module.css';

function App() {
  const [debugCtx, setDebugCtx] = useState(debugDefaults);
  const updateAppCtx = (key, value) => setAppCtx((prev) => ({ ...prev, [key]: value }));
  const [appCtx, setAppCtx] = useState({ update: updateAppCtx });
  const updateInput = (key, held) => setInputEvent((prev) => ({ ...prev, evt: key, held }));
  const [inputCtx, setInputEvent] = useState({ evt: null, setEvent: updateInput });
  const [landscape, setLandscape] = useState(false);

  useEffect(() => {
    window.addEventListener('orientationchange', handleDeviceDetection);
    return () => {
      window.removeEventListener('orientationchange', handleDeviceDetection);
    };
  }, []);

  const handleDeviceDetection = () => {
    if (window.matchMedia('(orientation: landscape)').matches) {
      setLandscape(false);
    } else {
      setLandscape(true);
    }
  };

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
        {landscape && <div className={styles.landscape}>LANDSCAPE MODE NOT SUPPORTED</div>}
        <div className={styles.App}>
          <div className={styles.container}>
            <DebugContext.Provider value={debugCtx}>
              <Game>
                <InputController />
              </Game>
            </DebugContext.Provider>
          </div>
          <div className={styles.btnContainer}>
            <DebugToggle
              value={debugCtx.tiles}
              clickHandler={(value) => setDebugCtx((prev) => ({ ...prev, tiles: value, items: value }))}
            />
            <KeyboardNav value={inputCtx.evt} />
            <AudioToggle value={appCtx.audio} clickHandler={(value) => updateAppCtx('audio', value)} />
          </div>
          <div className={styles.text}>
            <span>Version: {process.env.REACT_APP_VERSION}</span>
            <span>Created By: crayner</span>
            <span>
              <a target='_blank' href={process.env.REACT_APP_URL}>
                {process.env.REACT_APP_URL}
              </a>
            </span>
          </div>
        </div>
      </InputContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
