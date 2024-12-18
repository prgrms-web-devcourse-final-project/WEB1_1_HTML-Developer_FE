import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ValidationMessage from 'components/message/ValidationMessage';
import RadioItem from 'pages/busRentalDetail/components/RadioItem';

const BoardingTypeRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RadioList = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const refundType = ['추가 입금', '환불', '둘 다'];

const RefundTypeRadio = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="refundType"
      render={({ field, fieldState }) => (
        <BoardingTypeRadioContainer>
          <RadioList>
            {refundType.map((type) => (
              <RadioItem
                isChecked={field.value === type}
                key={type}
                name="refundType"
                onValueChange={field.onChange}
                value={type}
              />
            ))}
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
