import { Fragment } from 'react';
import styles from './App.module.css';

const AudioToggle = ({ value, clickHandler }) => (
  <Fragment>
    {value ? (
      <div className={styles.audioBtn}>
        <img src='icons/audio-on.png' onClick={() => clickHandler(false)} />
        <span>Audio On</span>
      </div>
    ) : (
      <div className={styles.audioBtn}>
        <img src='icons/audio-off.png' onClick={() => clickHandler(true)} />
        <span>Audio Off</span>
      </div>
    )}
  </Fragment>
);
export default AudioToggle;
