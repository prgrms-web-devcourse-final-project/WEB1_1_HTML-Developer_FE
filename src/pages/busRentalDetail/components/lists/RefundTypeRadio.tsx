import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import RadioItem from '../items/RadioItem';

import ValidationMessage from 'components/message/ValidationMessage';
import type { RefundType } from 'types';
import { REFUND_TYPE } from 'types';

interface RefundTypeRadioProps {
  refundOption: RefundType;
}

const RefundTypeRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RadioList = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const refundOptions = ['추가 입금', '환불'];

const RefundTypeRadio = ({ refundOption }: RefundTypeRadioProps) => {
  const { control } = useFormContext();

  const getKeyFromValue = (value: string) => {
    return Object.keys(REFUND_TYPE).find(
      (key) => REFUND_TYPE[key as RefundType] === value
    ) as RefundType;
  };

  return (
    <Controller
      control={control}
      name="refundType"
      render={({ field, fieldState }) => (
        <RefundTypeRadioContainer>
          <RadioList {...field}>
            {refundOptions.map((type) => (
              <RadioItem
                isChecked={field.value === type}
                isDisabled={refundOption !== 'BOTH' && getKeyFromValue(type) !== refundOption}
                key={type}
                name="refundType"
                onValueChange={(value) => field.onChange(getKeyFromValue(value))}
                value={type}
              />
            ))}
          </RadioList>
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </RefundTypeRadioContainer>
      )}
    />
  );
};

export default RefundTypeRadio;
