import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import BaseButton from 'components/buttons/BaseButton';
import InputField from 'components/inputField/InputField';
import { BodyMediumText, BodyRegularText } from 'styles/Typography';

const Nickname = () => {
  const { watch, setValue } = useFormContext();
  const nickname = watch('nickname');

  const handleNicknameChange = (value: string | number) => {
    setValue('nickname', value.toString());
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <BodyMediumText>닉네임</BodyMediumText>
        <BodyRegularText>한글/영문/숫자 포함 2~8글자</BodyRegularText>
      </TitleWrapper>
      <InputWrapper>
        <InputContainer>
          <InputField
            name="nickname"
            onValueChange={handleNicknameChange}
            placeholder="닉네임을 입력해주세요"
            value={nickname}
          />
        </InputContainer>
        <BaseButton color="primary" isFullWidth={false} size="small" variant="outline">
          중복 확인
        </BaseButton>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const InputContainer = styled.div`
  /* flex: 1; */
  /* min-width: 0; */
  width: 100%;
`;

export default Nickname;
