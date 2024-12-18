import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import CheckboxItem from './items/CheckboxItem';

import ValidationMessage from 'components/message/ValidationMessage';

const BoardingDateCheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

// 추후 삭제
const boardingDates = ['2024.09.20(금)', '2024.09.21(토)', '2024.09.22(일)'];

const BoardingDateCheckbox = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="rentBoardingDateRequests"
      render={({ field, fieldState }) => (
        <>
          <BoardingDateCheckboxList {...field}>
            {boardingDates.map((date) => (
              <CheckboxItem
                isChecked={field.value === date}
                key={date}
                name="rentBoardingDateRequests"
                onClick={field.onChange}
                value={date}
              />
            ))}
          </BoardingDateCheckboxList>
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </>
      )}
    />
  );
};

export default BoardingDateCheckbox;
