import { useContext, useEffect } from 'react';
import { InputContext } from './Context';

function InputController() {
  const isMobile = !window.matchMedia('(pointer:fine)').matches;

  const input = useContext(InputContext);

  const onKeyDown = (event) => {
    event.preventDefault();
    if (event.repeat) input.setEvent(event.code, true);
    else input.setEvent(event.code, false);
  };
  const onKeyUp = (event) => {
    event.preventDefault();
    input.setEvent(null, false);
  };

  useEffect(() => {
    console.log('Mount InputController');
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mouseUp', onKeyUp);
    // document.addEventListener('touchstart', onKeyDown);

    document.addEventListener('touchend', onKeyUp);

    if (isMobile) document.addEventListener('contextmenu', (event) => event.preventDefault());
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mouseUp', onKeyUp);
      //document.removeEventListener('touchstart', onKeyDown);
      document.removeEventListener('touchend', onKeyUp);
      if (isMobile) document.removeEventListener('contextmenu', (event) => event.preventDefault());
    };
  }, []);

  return null;
}

export default InputController;
