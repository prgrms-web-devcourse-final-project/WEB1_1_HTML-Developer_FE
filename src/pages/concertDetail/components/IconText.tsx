import styled from '@emotion/styled';

import { BodyRegularText } from 'styles/Typography';

interface IconTextProps {
  icon: React.ReactNode;
  text: string | undefined;
}

const IconText = ({ icon, text }: IconTextProps) => (
  <IconTextWrapper>
    {icon}
    <BodyRegularText>{text}</BodyRegularText>
  </IconTextWrapper>
);

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export default IconText;
