import { useRef, useEffect, useState, useContext, Fragment } from 'react';
import Dialogue from './Dialogue';
import { InteractContext } from 'Context';
import styles from './Overlay.module.css';

function Overlay({}) {
  const interactionCtx = useContext(InteractContext);
  const intervalRef = useRef(null);
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    animateText();
    return () => clearInterval(intervalRef.current);
  }, []);

  const animateText = () => {
    intervalRef.current = setInterval(() => {
      setCount((prevCounter) => prevCounter + 1);
    }, 50);
  };

  useEffect(() => {
    setText((prev) => (prev += interactionCtx.text[count]));
    if (count >= interactionCtx.text.length - 1) clearInterval(intervalRef.current);
  }, [count]);

  return (
    <Fragment>
      {interactionCtx.img && (
        <div className={styles.image}>
          <img src={interactionCtx.img}></img>
        </div>
      )}
      <Dialogue value={text} />
    </Fragment>
  );
}

export default Overlay;
