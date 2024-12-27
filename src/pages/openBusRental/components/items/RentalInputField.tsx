import styled from '@emotion/styled';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';

import ValidationMessage from 'components/message/ValidationMessage';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useRentalFormStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';
import type { RentalFormData } from 'types';

interface InputStyle {
  unit?: string;
}

interface InputFieldProps extends InputStyle {
  name: keyof RentalFormData;
  unit?: string;
  pattern?: string;
  isLive?: boolean;
  isNumeric?: boolean;
  isInactiveForm?: boolean;
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

const UnitText = styled(BodyRegularText)`
  flex-shrink: 0;
`;

const RentalInputField = ({
  name,
  unit,
  pattern,
  isLive = true,
  isNumeric = false,
  isDisabled = false,
  isFullWidth = true,
}: InputFieldProps) => {
  const { control } = useFormContext();
  const { formData, updateFormData } = useRentalFormStore(['formData', 'updateFormData']);
  const placeholder = RENTAL_FORM_PLACEHOLDER[name] || '입력해주세요';

  const handleInputChange = (
    onChange: (value: string | number) => void,
    value: string | number
  ) => {
    onChange(value);
    if (isLive) updateFormData(name, value);
  };

  const renderInputField = (field: ControllerRenderProps<FieldValues, string>) => {
    const commonProps = {
      ...field,
      placeholder,
      'aria-disabled': isDisabled,
    };

    if (isNumeric) {
      return (
        <NumericFormat
          {...commonProps}
          allowNegative
          customInput={Input}
          decimalScale={0}
          isAllowed={(values) => {
            const { floatValue } = values;
            if (!values.value) return true;
            return floatValue !== undefined && floatValue >= 1 && floatValue < 1000000;
          }}
          onValueChange={(value) => handleInputChange(field.onChange, value.floatValue || 0)}
          thousandSeparator
          unit={unit}
          value={formData[name] || field.value}
        />
      );
    }

    if (pattern) {
      return (
        <PatternFormat
          {...commonProps}
          customInput={Input}
          format={pattern}
          onValueChange={({ formattedValue }) => handleInputChange(field.onChange, formattedValue)}
          value={formData[name] || field.value}
        />
      );
    }

    return (
      <Input
        {...commonProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(field.onChange, e.target.value)
        }
        type="text"
        unit={unit}
        value={formData[name] || field.value}
      />
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputFieldContainer isFullWidth={isFullWidth}>
          <InputFieldWrapper isError={!!fieldState.error}>
            {renderInputField(field)}
            {unit && <UnitText>{unit}</UnitText>}
          </InputFieldWrapper>
          {fieldState.error?.message && <ValidationMessage message={fieldState.error.message} />}
        </InputFieldContainer>
      )}
    />
  );
};

export default RentalInputField;
