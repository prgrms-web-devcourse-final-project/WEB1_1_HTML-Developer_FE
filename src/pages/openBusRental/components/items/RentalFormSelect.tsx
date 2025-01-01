import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';
import { TbChevronDown } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface RentalFormSelectProps {
  name: string;
  value?: string;
  placeholder?: string;
  onClick: () => void;
}

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.2rem 0 1.6rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  cursor: pointer;
  user-select: none;
`;

const SelectValueText = styled(BodyRegularText)<{ isValid?: boolean }>`
  color: ${({ theme, isValid }) => (isValid ? theme.colors.dark[100] : theme.colors.dark[300])};
`;

const RentalFormSelect = ({
  name,
  value,
  placeholder = '선택해주세요',
  onClick,
}: RentalFormSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SelectContainer onClick={onClick}>
          <SelectValueText isValid={field.value || value}>
            {field.value || value || placeholder}
          </SelectValueText>
          <TbChevronDown size={24} />
        </SelectContainer>
      )}
    />
  );
};

export default RentalFormSelect;
