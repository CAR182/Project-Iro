import { useContext, useEffect } from 'react';
import { InputContext } from './Context';

function InputController() {
  const input = useContext(InputContext);

  const onKeyDown = (event) => {
    // console.log('OnKeyDown: ', event.repeat);
    event.preventDefault();
    if (event.repeat) input.setEvent(event.code, true);
    else input.setEvent(event.code, false);
  };
  const onKeyUp = (event) => {
    //console.log('onKeyUp');
    event.preventDefault();
    input.setEvent(null, false);
  };

  useEffect(() => {
    console.log('Mount InputController');
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return null;
}

export default InputController;
