import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import RadioItem from '../items/RadioItem';

import ValidationMessage from 'components/message/ValidationMessage';
import type { BoardingDates } from 'types';
import { formatDateWithDay } from 'utils';

interface BoardingDateRadioProps {
  boardingDates: BoardingDates[];
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
            {boardingDates.map((boardingDate) => {
              const formattedDate = formatDateWithDay(boardingDate.date);
              return (
                <RadioItem
                  isChecked={field.value === formattedDate}
                  isDisabled={boardingDate.isApplied}
                  key={boardingDate.date}
                  name="boardingDate"
                  onValueChange={field.onChange}
                  value={formattedDate}
                />
              );
            })}
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
