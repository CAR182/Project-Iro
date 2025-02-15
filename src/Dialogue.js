import styles from './Overlay.module.css';

const Dialogue = ({ value }) => (
  <div className={styles.dialogueContainer}>
    <div className={styles.dialogue}>
      <span className={styles.text}>{value}</span>
    </div>
  </div>
);
export default Dialogue;
