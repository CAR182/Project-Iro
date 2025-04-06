import React, { useEffect, useContext } from 'react';

import { AppContext } from 'Context';
import { INPUT } from 'Utils';
import styles from './App.module.css';

const KeyboardNav = ({ value, clickHandler }) => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    console.log('AppCtx: ', appCtx);
  }, [appCtx]);

  useEffect(() => {
    console.log('ValueUpdated: ', value);
  }, [value]);

  return (
    <div className={styles.keyboard}>
      <div className={styles.arrowKeys}>
        <div id={styles.up}>
          {value == INPUT.W ? (
            <img src='icons/keyboard_arrow_up.png' />
          ) : (
            <img src='icons/keyboard_arrow_up_outline.png' />
          )}
        </div>
        <div id={styles.down}>
          {value == INPUT.S ? (
            <img src='icons/keyboard_arrow_down.png' />
          ) : (
            <img src='icons/keyboard_arrow_down_outline.png' />
          )}
        </div>
        <div id={styles.left}>
          {value == INPUT.A ? (
            <img src='icons/keyboard_arrow_left.png' />
          ) : (
            <img src='icons/keyboard_arrow_left_outline.png' />
          )}
        </div>
        <div id={styles.right}>
          {value == INPUT.D ? (
            <img src='icons/keyboard_arrow_right.png' />
          ) : (
            <img src='icons/keyboard_arrow_right_outline.png' />
          )}
        </div>
      </div>
      <div>
        {value == INPUT.Space ? <img src='icons/keyboard_space.png' /> : <img src='icons/keyboard_space_outline.png' />}
      </div>
    </div>
  );
};
export default KeyboardNav;
