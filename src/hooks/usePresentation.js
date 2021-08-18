import { useEffect, useRef, useState } from 'react';
import {
  DESKTOP_PRESENTATION,
  MOBILE_PRESENTATION,
  TAB_PRESENTATION,
} from '../utils/constants';

export const usePresentation = () => {
  const timer = useRef();
  const [presentation, setPresentation] = useState(null);

  const calcPresentation = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 320 && windowWidth <= 480) {
      setPresentation(MOBILE_PRESENTATION);
    } else if (windowWidth > 480 && windowWidth <= 768) {
      setPresentation(TAB_PRESENTATION);
    } else {
      setPresentation(DESKTOP_PRESENTATION);
    }
  };

  const onResize = (e) => {
    if (timer) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      calcPresentation();
    }, 200);
  };

  useEffect(() => {
    calcPresentation();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return presentation;
};
