import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import InputField from 'components/inputField/InputField';
import { BodyMediumText } from 'styles/Typography';

const ShortBio = () => {
  const { watch } = useFormContext();

  return (
    <Wrapper>
      <BodyMediumText>한 줄 소개(선택)</BodyMediumText>
      <InputField
        name="introduce"
        onValueChange={() => {}}
        placeholder="간단한 소개를 입력해주세요"
        value={watch('introduce')}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`;

export default ShortBio;
