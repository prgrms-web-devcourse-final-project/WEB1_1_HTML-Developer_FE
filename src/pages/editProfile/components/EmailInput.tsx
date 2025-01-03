import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import type { ProfileSchemaType } from 'schemas';
import { BodyMediumText } from 'styles/Typography';

export const EmailInput = () => {
  const { control } = useFormContext<ProfileSchemaType>();

  return (
    <InputWrapper>
      <BodyMediumText>이메일</BodyMediumText>
      <Controller
        control={control}
        name="email"
        render={({ field }) => <Input disabled {...field} />}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 0.4rem;
  min-height: 4rem;
  background: ${({ theme }) => theme.colors.dark[700]};
  color: ${({ theme }) => theme.colors.dark[300]};
`;
