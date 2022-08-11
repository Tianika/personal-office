import { ReactElement, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

type ModalType = {
  children: ReactElement;
};

const Modal = ({ children }: ModalType) => {
  const modal = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(modal);
    return () => {
      document.body.removeChild(modal);
    };
  }, [modal]);

  return createPortal(<div className={styles.container}>{children}</div>, modal);
};

export default Modal;
