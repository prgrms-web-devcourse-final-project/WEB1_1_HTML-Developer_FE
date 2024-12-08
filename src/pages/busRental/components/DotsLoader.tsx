import styled from '@emotion/styled';
import type { Transition } from 'framer-motion';
import { motion } from 'framer-motion';

const LoaderContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  margin: 0 auto;
  padding: 1.6rem 0;
`;

const Dot = styled(motion.span)`
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const ContainerVariants = {
  initial: { transition: { staggerChildren: 0.2 } },
  animate: { transition: { staggerChildren: 0.2 } },
};

const DotTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

const DotVariants = {
  initial: { y: '0%' },
  animate: { y: '100%' },
};

const DotsLoader = () => {
  return (
    <LoaderContainer animate="animate" initial="initial" variants={ContainerVariants}>
      <Dot transition={DotTransition} variants={DotVariants} />
      <Dot transition={DotTransition} variants={DotVariants} />
      <Dot transition={DotTransition} variants={DotVariants} />
    </LoaderContainer>
  );
};

export default DotsLoader;
