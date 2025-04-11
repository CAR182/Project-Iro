import { useContext, useEffect } from 'react';
import { InputContext } from './Context';

import { INPUT } from 'Utils';
import styles from './App.module.css';

const KeyboardNav = ({ value }) => {
  const isMobile = window.innerWidth < 768;

  const upFill = isMobile ? 'icons/keyboard_arrow_up.png' : 'icons/keyboard_w.png';
  const upOutline = isMobile ? 'icons/keyboard_arrow_up_outline.png' : 'icons/keyboard_w_outline.png';
  const downFill = isMobile ? 'icons/keyboard_arrow_down.png' : 'icons/keyboard_s.png';
  const downOutline = isMobile ? 'icons/keyboard_arrow_down_outline.png' : 'icons/keyboard_s_outline.png';
  const leftFill = isMobile ? 'icons/keyboard_arrow_left.png' : 'icons/keyboard_a.png';
  const leftOutline = isMobile ? 'icons/keyboard_arrow_left_outline.png' : 'icons/keyboard_a_outline.png';
  const rightFill = isMobile ? 'icons/keyboard_arrow_right.png' : 'icons/keyboard_d.png';
  const rightOutline = isMobile ? 'icons/keyboard_arrow_right_outline.png' : 'icons/keyboard_d_outline.png';
  const selectFill = isMobile ? 'icons/button_a.png' : 'icons/keyboard_space_outline.png';
  const selectOutline = isMobile ? 'icons/button_a_outline.png' : 'icons/keyboard_space_outline.png';

  const input = useContext(InputContext);

  const onKeyDown = (key) => {
    input.setEvent(key, false);
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.arrowKeys}>
        <div
          id={styles.up}
          onMouseDown={() => onKeyDown(INPUT.W)}
          onTouchStart={() => onKeyDown(INPUT.W)}
          onTouchEnd={() => onKeyDown(null)}>
          {value == INPUT.W ? <img src={upFill} /> : <img src={upOutline} />}
        </div>
        <div id={styles.down} onMouseDown={() => onKeyDown(INPUT.S)} onTouchStart={() => onKeyDown(INPUT.S)}>
          {value == INPUT.S ? <img src={downFill} /> : <img src={downOutline} />}
        </div>
        <div id={styles.left} onMouseDown={() => onKeyDown(INPUT.A)} onTouchStart={() => onKeyDown(INPUT.A)}>
          {value == INPUT.A ? <img src={leftFill} /> : <img src={leftOutline} />}
        </div>
        <div id={styles.right} onMouseDown={() => onKeyDown(INPUT.D)} onTouchStart={() => onKeyDown(INPUT.D)}>
          {value == INPUT.D ? <img src={rightFill} /> : <img src={rightOutline} />}
        </div>
      </div>
      <div onMouseDown={() => onKeyDown(INPUT.Space)} onTouchStart={() => onKeyDown(INPUT.Space)}>
        {value == INPUT.Space ? <img src={selectFill} /> : <img src={selectOutline} />}
      </div>
    </div>
  );
};
export default KeyboardNav;
