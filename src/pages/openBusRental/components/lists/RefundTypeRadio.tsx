import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ValidationMessage from 'components/message/ValidationMessage';
import RadioItem from 'pages/busRentalDetail/components/RadioItem';
import { useRentalFormStore } from 'stores';
import type { RefundType } from 'types';
import { REFUND_TYPE } from 'types';

const BoardingTypeRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RadioList = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const RefundTypeRadio = () => {
  const { control } = useFormContext();
  const { updateFormData } = useRentalFormStore(['updateFormData']);

  const refundTypeList = Object.keys(REFUND_TYPE) as RefundType[];

  return (
    <Controller
      control={control}
      name="refundType"
      render={({ field, fieldState }) => (
        <BoardingTypeRadioContainer>
          <RadioList>
            {refundTypeList.map((type) => {
              return (
                <RadioItem
                  isChecked={field.value === type}
                  key={type}
                  name="refundType"
                  onValueChange={() => {
                    field.onChange(type);
                    updateFormData('refundType', type);
                  }}
                  value={REFUND_TYPE[type]}
                />
              );
            })}
          </RadioList>
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </BoardingTypeRadioContainer>
      )}
    />
  );
};

export default RefundTypeRadio;
