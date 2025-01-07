import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import { BodyRegularText } from 'styles/Typography';

interface ConcertTimeProps {
  time: string;
}

const ConcertTimeContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: 9.2rem;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.dark[300] : theme.colors.dark[500]};
  cursor: pointer;
`;

const ConcertTime = ({ time }: ConcertTimeProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="episode"
      render={({ field }) => (
        <ConcertTimeContainer isActive={field.value === time} onClick={() => field.onChange(time)}>
          <BodyRegularText>{time}</BodyRegularText>
        </ConcertTimeContainer>
      )}
    />
  );
};

export default ConcertTime;
