import styled from '@emotion/styled';

import InputField from 'components/inputField/InputField';
import { BodyMediumText } from 'styles/Typography';

const Email = () => {
  const handleEmail = (value: string | number) => {};

  return (
    <Wrapper>
      <BodyMediumText>이메일</BodyMediumText>
      <InputField isDisabled={true} name="email" onValueChange={handleEmail} value="email" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`;

export default Email;
