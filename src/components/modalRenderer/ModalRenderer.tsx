import { AnimatePresence } from 'framer-motion';
import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

import { useModalStore } from 'stores';

const ModalRenderer = () => {
  const location = useLocation();
  const { bottomSheet, dialog, closeAllModal } = useModalStore([
    'bottomSheet',
    'dialog',
    'closeAllModal',
  ]);

  useEffect(() => {
    closeAllModal();
  }, [location.pathname]);

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  const renderModals = (modals: Record<string, { content: React.ReactNode }>) => {
    return Object.entries(modals).map(([key, { content }]) => (
      <Fragment key={key}>{content}</Fragment>
    ));
  };

  return createPortal(
    <AnimatePresence>
      {renderModals(dialog)}
      {renderModals(bottomSheet)}
    </AnimatePresence>,
    portalRoot
  );
};

export default ModalRenderer;
