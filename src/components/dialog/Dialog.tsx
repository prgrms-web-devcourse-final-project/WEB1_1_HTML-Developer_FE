import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface DialogProps {
  children: React.ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  return (
    <>
      <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} />
      <StyledMotionDiv
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        initial={{ y: '100%', opacity: 0 }}
        style={{ x: '-50%' }}
        transition={{
          type: 'spring',
          damping: 60,
          stiffness: 350,
          mass: 0.8,
        }}
      >
        {children}
      </StyledMotionDiv>
    </>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const Button = ({ children }: { children: React.ReactNode }) => {
  return <ButtonWrapper>{children}</ButtonWrapper>;
};

Dialog.Content = Content;
Dialog.Button = Button;

const Overlay = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const StyledMotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: fixed;
  top: 40%;
  left: 50%;
  max-width: calc(${({ theme }) => theme.maxWidth} - 5rem);
  width: 100%;
  padding: 2.4rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  z-index: 1002;
  color: ${({ theme }) => theme.colors.dark[50]};
`;

const ContentWrapper = styled.div`
  text-align: center;
  padding: 2.4rem 0 1.6rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

export default Dialog;
