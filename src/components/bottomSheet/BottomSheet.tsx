import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

import { useBottomSheetStore } from 'stores/useBottomSheetStore';

const BottomSheet = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, closeBottomSheet } = useBottomSheetStore(['isOpen', 'closeBottomSheet']);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={closeBottomSheet}
          />
          <StyledMotionDiv
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            initial={{ y: '100%' }}
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
      )}
    </AnimatePresence>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderWrapper>
      <HandleBar />
      {children}
    </HeaderWrapper>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <FooterWrapper>{children}</FooterWrapper>;
};

BottomSheet.Header = Header;
BottomSheet.Content = Content;
BottomSheet.Footer = Footer;

export default BottomSheet;

const Overlay = styled(motion.div)`
  position: fixed;
  bottom: 0;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const StyledMotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  max-width: ${({ theme }) => theme.maxWidth};
  max-height: 85vh;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;

  z-index: 1002;
`;

const HeaderWrapper = styled.div`
  flex-shrink: 0;
  padding: 1.6rem 1.2rem;
  border-bottom: 1px solid #f3f4f6;
`;

const HandleBar = styled.div`
  width: 5rem;
  height: 0.3rem;
  margin: 0 auto;
  margin-bottom: 2.4rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
`;

const ContentWrapper = styled.div`
  padding: 2.4rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FooterWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem;
  border-top: 1px solid #f3f4f6;
  background: white;
`;
