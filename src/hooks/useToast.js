import { useEffect, useRef, useState } from 'react';

const useToast = (duration = 5000) => {
  const [msg, setMsg] = useState('');
  const timer = useRef(null);
  const toast = useRef(null);

  const create = () => {
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');
    toastElement.textContent = String(msg);
    document.body.appendChild(toastElement);
    toast.current = toastElement;
  };

  const show = () => {
    toast.current?.classList?.add('toast_visible');
  };

  const remove = () => {
    toast.current?.remove();
  };

  const hide = () => {
    toast.current?.classList?.remove('toast_visible');
  };

  useEffect(() => {
    if (msg) {
      create();
      setTimeout(() => {
        show();
      }, 50);
      timer.current = setTimeout(() => {
        setMsg('');
        timer.current = null;
      }, duration);
    } else {
      hide();
      setTimeout(() => {
        remove();
      }, 200);
    }
  }, [duration, msg]);

  return setMsg;
};

export default useToast;
