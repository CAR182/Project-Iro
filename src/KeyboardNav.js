import { useContext, useEffect } from 'react';
import { InputContext } from './Context';

import { INPUT } from 'Utils';
import styles from './App.module.css';

const KeyboardNav = ({ value }) => {
  const input = useContext(InputContext);

  const onKeyDown = (key) => {
    console.log('onKeyboardDown: ', key);
    input.setEvent(key, false);
  };

  const onKeyUp = () => {
    console.log('onKeyboardUp');
    input.setEvent(null, false);
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.arrowKeys}>
        <div
          id={styles.up}
          onMouseDown={() => onKeyDown(INPUT.W)}
          onMouseUp={() => onKeyUp()}
          onTouchStart={() => onKeyDown(INPUT.W)}
          onTouchEnd={() => onKeyUp()}>
          {value == INPUT.W ? (
            <img src='icons/keyboard_arrow_up.png' />
          ) : (
            <img src='icons/keyboard_arrow_up_outline.png' />
          )}
        </div>
        <div
          id={styles.down}
          onMouseDown={() => onKeyDown(INPUT.S)}
          onMouseUp={() => onKeyUp()}
          onTouchStart={() => onKeyDown(INPUT.S)}
          onTouchEnd={() => onKeyUp()}>
          {value == INPUT.S ? (
            <img src='icons/keyboard_arrow_down.png' />
          ) : (
            <img src='icons/keyboard_arrow_down_outline.png' />
          )}
        </div>
        <div
          id={styles.left}
          onMouseDown={() => onKeyDown(INPUT.A)}
          onMouseUp={() => onKeyUp()}
          onTouchStart={() => onKeyDown(INPUT.A)}
          onTouchEnd={() => onKeyUp()}>
          {value == INPUT.A ? (
            <img src='icons/keyboard_arrow_left.png' />
          ) : (
            <img src='icons/keyboard_arrow_left_outline.png' />
          )}
        </div>
        <div
          id={styles.right}
          onMouseDown={() => onKeyDown(INPUT.D)}
          onMouseUp={() => onKeyUp()}
          onTouchStart={() => onKeyDown(INPUT.D)}
          onTouchEnd={() => onKeyUp()}>
          {value == INPUT.D ? (
            <img src='icons/keyboard_arrow_right.png' />
          ) : (
            <img src='icons/keyboard_arrow_right_outline.png' />
          )}
        </div>
      </div>
      <div
        onMouseDown={() => onKeyDown(INPUT.Space)}
        onMouseUp={() => onKeyUp()}
        onTouchStart={() => onKeyDown(INPUT.Space)}
        onTouchEnd={() => onKeyUp()}>
        {value == INPUT.Space ? <img src='icons/keyboard_space.png' /> : <img src='icons/keyboard_space_outline.png' />}
      </div>
    </div>
  );
};
export default KeyboardNav;
