import { Fragment } from 'react';
import styles from './App.module.css';

const DebugToggle = ({ value, clickHandler }) => (
  <Fragment>
    {value ? (
      <div className={styles.debugBtn}>
        <img src='icons/debugging-on.png' onClick={() => clickHandler(false)} />
        <span>Debug On</span>
      </div>
    ) : (
      <div className={styles.debugBtn}>
        <img src='icons/debugging-off.png' onClick={() => clickHandler(true)} />
        <span>Debug Off</span>
      </div>
    )}
  </Fragment>
);
export default DebugToggle;
