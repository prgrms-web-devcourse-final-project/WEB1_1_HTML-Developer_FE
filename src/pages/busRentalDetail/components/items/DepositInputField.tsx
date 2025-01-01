import styled from '@emotion/styled';
import { forwardRef } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import ValidationMessage from 'components/message/ValidationMessage';
import { DEPOSIT_FORM_PLACEHOLDER } from 'constants/placeholder';
import { BodyRegularText } from 'styles/Typography';
import type { DepositFormData } from 'types';

interface InputStyle {
  unit?: string;
}

interface InputFieldProps extends InputStyle {
  name: keyof DepositFormData;
  unit?: string;
  pattern?: string;
  isInactiveForm?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onBlur?: (value: string) => void;
}

const InputFieldContainer = styled.div<{ isFullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '18rem')};
`;

const Input = styled.input<InputStyle>`
  width: 100%;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  text-align: ${({ unit }) => (unit ? 'right' : 'start')};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const InputFieldWrapper = styled.div<{ isError: boolean; isDisabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.6rem;
  border-radius: 4px;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.dark[700] : theme.colors.dark[500]};
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.dark[300] : theme.colors.dark[100]};
  outline: 2px solid ${({ isError, theme }) => (isError ? theme.colors.red : 'none')};
  outline-offset: -2px;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }

  ${Input} {
    color: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.dark[300] : theme.colors.dark[100]};
  }
`;

const UnitText = styled(BodyRegularText)`
  flex-shrink: 0;
`;

const DepositInputField = forwardRef<HTMLInputElement, InputFieldProps>(function RentalInputField(
  { name, unit, pattern, isDisabled = false, isFullWidth = true, onBlur }: InputFieldProps,
  ref
) {
  const { control } = useFormContext();
  const placeholder = DEPOSIT_FORM_PLACEHOLDER[name] || '입력해주세요';

  const handleInputChange = (
    onChange: (value: string | number) => void,
    value: string | number
  ) => {
    onChange(value);
  };

  const handleFocusIn = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const element = e.target;
    const length = element.value.length;
    element.setSelectionRange(length, length);
  };

  const renderInputField = (field: ControllerRenderProps<FieldValues, string>) => {
    const commonProps = {
      ...field,
      placeholder,
      'aria-disabled': isDisabled,
      ref,
    };

    if (pattern) {
      return (
        <PatternFormat
          {...commonProps}
          customInput={Input}
          format={pattern}
          onBlur={(e) => onBlur?.(e.target.value)}
          onFocus={(e) => handleFocusIn(e)}
          onValueChange={({ formattedValue }) => handleInputChange(field.onChange, formattedValue)}
        />
      );
    }

    return (
      <Input
        {...commonProps}
        onBlur={(e) => onBlur?.(e.target.value)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(field.onChange, e.target.value)
        }
        onFocus={(e) => handleFocusIn(e)}
        type="text"
        unit={unit}
      />
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputFieldContainer isFullWidth={isFullWidth}>
          <InputFieldWrapper isDisabled={isDisabled} isError={!!fieldState.error}>
            {renderInputField(field)}
            {unit && <UnitText>{unit}</UnitText>}
          </InputFieldWrapper>
          {fieldState.error?.message && <ValidationMessage message={fieldState.error.message} />}
        </InputFieldContainer>
      )}
    />
  );
});

export default DepositInputField;
