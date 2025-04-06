import { useContext } from 'react';
import { InputContext } from './Context';

import { INPUT } from 'Utils';
import styles from './App.module.css';

const KeyboardNav = ({ value }) => {
  const input = useContext(InputContext);

  const onKeyDown = (key) => {
    input.setEvent(key, false);
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.arrowKeys}>
        <div id={styles.up} onMouseDown={() => onKeyDown(INPUT.W)} onTouchStart={() => onKeyDown(INPUT.W)}>
          {value == INPUT.W ? (
            <img src='icons/keyboard_arrow_up.png' />
          ) : (
            <img src='icons/keyboard_arrow_up_outline.png' />
          )}
        </div>
        <div id={styles.down} onMouseDown={() => onKeyDown(INPUT.S)} onTouchStart={() => onKeyDown(INPUT.S)}>
          {value == INPUT.S ? (
            <img src='icons/keyboard_arrow_down.png' />
          ) : (
            <img src='icons/keyboard_arrow_down_outline.png' />
          )}
        </div>
        <div id={styles.left} onMouseDown={() => onKeyDown(INPUT.A)} onTouchStart={() => onKeyDown(INPUT.A)}>
          {value == INPUT.A ? (
            <img src='icons/keyboard_arrow_left.png' />
          ) : (
            <img src='icons/keyboard_arrow_left_outline.png' />
          )}
        </div>
        <div id={styles.right} onMouseDown={() => onKeyDown(INPUT.D)} onTouchStart={() => onKeyDown(INPUT.D)}>
          {value == INPUT.D ? (
            <img src='icons/keyboard_arrow_right.png' />
          ) : (
            <img src='icons/keyboard_arrow_right_outline.png' />
          )}
        </div>
      </div>
      <div onMouseDown={() => onKeyDown(INPUT.Space)} onTouchStart={() => onKeyDown(INPUT.Space)}>
        {value == INPUT.Space ? <img src='icons/keyboard_space.png' /> : <img src='icons/keyboard_space_outline.png' />}
      </div>
    </div>
  );
};
export default KeyboardNav;
