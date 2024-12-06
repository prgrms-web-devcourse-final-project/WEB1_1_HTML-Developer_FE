import { createPortal } from 'react-dom';

import Toast from './Toast';

const ToastRenderer = () => {
  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  return createPortal(<Toast />, portalRoot);
};

export default ToastRenderer;
