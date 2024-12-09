import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import RadioItem from './RadioItem';

import ValidationMessage from 'components/message/ValidationMessage';

interface BoardingDateRadioProps {
  boardingDates: string[];
}

const BoardingDateRadioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const BoardingDateRadio = ({ boardingDates }: BoardingDateRadioProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="boardingDate"
      render={({ field, fieldState }) => (
        <>
          <BoardingDateRadioList {...field}>
            {boardingDates.map((date) => (
              <RadioItem
                isChecked={field.value === date}
                key={date}
                name="boardingDate"
                onValueChange={field.onChange}
                value={date}
              />
            ))}
          </BoardingDateRadioList>
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </>
      )}
    />
  );
};

export default BoardingDateRadio;
