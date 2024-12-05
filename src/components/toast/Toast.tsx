import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

import { useToastStore } from 'stores/useToastStore';
import { CaptionText } from 'styles/Typography';

const ToastItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: fixed;
  bottom: 10%;
  left: 50%;
  z-index: 2000;
  padding: 1.2rem 2rem;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.dark[800]};
`;

const Toast = () => {
  const { toasts } = useToastStore(['toasts']);

  return (
    <AnimatePresence>
      {toasts.length > 0 && (
        <ToastItem
          animate={{ x: '-50%', y: 0, opacity: 1 }}
          exit={{ x: '-50%', y: 100, opacity: 0 }}
          initial={{ x: '-50%', y: 100, opacity: 0 }}
          key={toasts[0].id}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {toasts[0].icon}
          <CaptionText>{toasts[0].content}</CaptionText>
        </ToastItem>
      )}
    </AnimatePresence>
  );
};

export default Toast;
