import { Fragment } from 'react';
import styles from './App.module.css';

const DebugToggle = ({ value, clickHandler }) => (
  <Fragment>
    {value ? (
      <div className={styles.debugBtn} onMouseDown={() => clickHandler(false)} onTouchStart={() => clickHandler(false)}>
        <img src='icons/debugging-on.png' />
        <span>Debug On</span>
      </div>
    ) : (
      <div className={styles.debugBtn}>
        <img
          src='icons/debugging-off.png'
          onMouseDown={() => clickHandler(true)}
          onTouchStart={() => clickHandler(true)}
        />
        <span>Debug Off</span>
      </div>
    )}
  </Fragment>
);
export default DebugToggle;
