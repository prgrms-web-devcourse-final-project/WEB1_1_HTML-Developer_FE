import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import type { ProfileSchemaType } from 'schemas';
import { BodyMediumText, CaptionText } from 'styles/Typography';

export const IntroduceInput = () => {
  const { control } = useFormContext<ProfileSchemaType>();

  return (
    <Wrapper>
      <Controller
        control={control}
        name="introduce"
        render={({ field, fieldState }) => (
          <>
            <HeaderWrapper>
              <BodyMediumText>한 줄 소개</BodyMediumText>
              <CaptionText color="dark300">{(field.value || '').length}/100</CaptionText>
            </HeaderWrapper>
            <TextArea
              {...field}
              placeholder="나를 한 줄로 표현해보세요"
              rows={4}
              value={field.value || ''}
            />
            {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
          </>
        )}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;
  resize: none;
  font-family: inherit;
  min-height: 10rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

const ErrorText = styled(CaptionText)`
  color: ${({ theme }) => theme.colors.red};
`;
