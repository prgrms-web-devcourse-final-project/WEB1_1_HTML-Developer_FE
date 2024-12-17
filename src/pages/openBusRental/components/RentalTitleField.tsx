import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ValidationMessage from 'components/message/ValidationMessage';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { CaptionText } from 'styles/Typography';
import type { RentalFormValues } from 'types';

interface RentalTitleFieldProps {
  name: keyof RentalFormValues;
  unit?: string;
  pattern?: string;
  isDisabled?: boolean;
}

const InputFieldContainer = styled.div`
  width: 100%;
`;

const TitleInput = styled.input<{ isError: boolean }>`
  width: 100%;
  min-width: 24rem;
  height: 4rem;
  margin-bottom: 0.8rem;
  padding: 0 0.4rem;
  border: none;
  border-bottom: 2px solid
    ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
  background: none;
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.title2.size};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const CharCount = styled(CaptionText)<{ isError: boolean }>`
  display: block;
  color: ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
`;

const MAX_LENGTH = 45;

const RentalTitleField = ({ name }: RentalTitleFieldProps) => {
  const { control, watch } = useFormContext();

  const placeholder = RENTAL_FORM_PLACEHOLDER[name] || '입력해주세요';

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <InputFieldContainer>
            <TitleInput
              {...field}
              isError={!!fieldState?.error}
              maxLength={MAX_LENGTH - 1}
              onChange={(e) => {
                field.onChange(e);
              }}
              placeholder={placeholder}
              type="text"
            />
            <CharCount isError={!!fieldState?.error}>
              {watch(`${name}`).length} / {MAX_LENGTH}자
            </CharCount>
          </InputFieldContainer>
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </>
      )}
    />
  );
};

export default RentalTitleField;
