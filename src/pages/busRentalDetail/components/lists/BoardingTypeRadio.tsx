import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import RadioItem from '../items/RadioItem';

import ValidationMessage from 'components/message/ValidationMessage';

const BoardingTypeRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RadioList = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const boardingType = ['왕복', '상행', '하행'];

const BoardingTypeRadio = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="boardingType"
      render={({ field, fieldState }) => (
        <BoardingTypeRadioContainer>
          <RadioList>
            {boardingType.map((type) => (
              <RadioItem
                isChecked={field.value === type}
                key={type}
                name="boardingType"
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

export default BoardingTypeRadio;
