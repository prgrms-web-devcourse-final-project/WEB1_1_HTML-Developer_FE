import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import CheckboxItem from '../items/CheckboxItem';

import ValidationMessage from 'components/message/ValidationMessage';
import { useRentalFormStore } from 'stores';
import { formatDateWithDay, getDateRangeArray } from 'utils';

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const BoardingDateCheckList = () => {
  const { control } = useFormContext();
  const { concertData, formData, updateFormData } = useRentalFormStore([
    'concertData',
    'formData',
    'updateFormData',
  ]);

  const boardingDates =
    concertData?.stdate && concertData?.eddate
      ? getDateRangeArray(concertData?.stdate, concertData?.eddate)
      : [];

  return (
    <Controller
      control={control}
      defaultValue={[]}
      name="boardingDates"
      render={({ field, fieldState }) => (
        <>
          <CheckboxList>
            {boardingDates.map((date) => {
              const prevDates = formData['boardingDates'];
              const isChecked = prevDates.includes(date);
              return (
                <CheckboxItem
                  isChecked={isChecked}
                  key={date}
                  name="boardingDates"
                  onClick={() => {
                    const newDates = isChecked
                      ? prevDates.filter((item: string) => item !== date)
                      : [...prevDates, date];
                    field.onChange(newDates);
                    updateFormData('boardingDates', newDates);
                  }}
                  value={formatDateWithDay(date)}
                />
              );
            })}
          </CheckboxList>
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </>
      )}
    />
  );
};

export default BoardingDateCheckList;
