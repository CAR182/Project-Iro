import { Fragment } from 'react';
import styles from './App.module.css';

const AudioToggle = ({ value, clickHandler }) => (
  <Fragment>
    {value ? (
      <div className={styles.audioBtn} onMouseDown={() => clickHandler(false)} onTouchStart={() => clickHandler(false)}>
        <img src='icons/audio-on.png' />
        <span>Audio On</span>
      </div>
    ) : (
      <div className={styles.audioBtn} onMouseDown={() => clickHandler(true)} onTouchStart={() => clickHandler(true)}>
        <img src='icons/audio-off.png' />
        <span>Audio Off</span>
      </div>
    )}
  </Fragment>
);
export default AudioToggle;
