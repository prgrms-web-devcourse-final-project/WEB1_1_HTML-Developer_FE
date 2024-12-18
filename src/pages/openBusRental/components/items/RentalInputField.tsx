import styled from '@emotion/styled';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import ValidationMessage from 'components/message/ValidationMessage';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { BodyRegularText } from 'styles/Typography';
import type { RentalFormValues } from 'types';

interface InputStyle {
  unit?: string;
}

interface InputFieldProps extends InputStyle {
  name: keyof RentalFormValues;
  unit?: string;
  pattern?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
}

const InputFieldContainer = styled.div<{ isFullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '18rem')};
`;

const InputFieldWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.6rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
  outline: 2px solid ${({ isError, theme }) => (isError ? theme.colors.red : 'none')};
  outline-offset: -2px;

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }

  &[aria-disabled='true'] {
    background: ${({ theme }) => theme.colors.dark[700]};
    color: ${({ theme }) => theme.colors.dark[300]};
    pointer-events: none;
  }
`;

const Input = styled.input<InputStyle>`
  width: 100%;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  text-align: ${({ unit }) => (unit ? 'right' : 'start')};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const RentalInputField = ({
  name,
  unit,
  pattern,
  isDisabled = false,
  isFullWidth = true,
}: InputFieldProps) => {
  const { control } = useFormContext();
  const { register } = useForm();

  const placeholder = RENTAL_FORM_PLACEHOLDER[name] || '입력해주세요';

  const renderPatternInput = (field: ControllerRenderProps<FieldValues, string>) =>
    pattern && (
      <PatternFormat
        {...field}
        {...register(name)}
        customInput={Input}
        format={pattern}
        onValueChange={(values) => {
          field.onChange(values.formattedValue);
        }}
        placeholder={placeholder}
      />
    );

  const renderTextInput = (field: ControllerRenderProps<FieldValues, string>) => (
    <Input
      {...field}
      {...register(name)}
      onChange={(e) => {
        field.onChange(e);
      }}
      placeholder={placeholder}
      type="text"
      unit={unit}
    />
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputFieldContainer isFullWidth={isFullWidth}>
          <InputFieldWrapper aria-disabled={isDisabled} isError={!!fieldState?.error}>
            {pattern ? renderPatternInput(field) : renderTextInput(field)}
            {unit && <BodyRegularText>{unit}</BodyRegularText>}
          </InputFieldWrapper>
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </InputFieldContainer>
      )}
    />
  );
};

export default RentalInputField;
