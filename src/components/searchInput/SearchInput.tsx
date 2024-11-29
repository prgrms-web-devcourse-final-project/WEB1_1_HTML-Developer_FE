import styled from '@emotion/styled';
import { useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';

interface SearchInputProps {
  text: string;
  isActive: boolean;
}
const SearchInput = ({ text, isActive }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchInputContainer isActive={isActive}>
      <IoSearch size={24} />
      <Input
        hasValue={!!searchValue}
        onChange={handleChange}
        placeholder={text}
        value={isActive ? searchValue : ''}
      />
      {searchValue && <ClearButton onClick={() => setSearchValue('')} size={24} />}
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-radius: 0.4rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.2rem;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.dark[500] : theme.colors.dark[700]};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark[300] : theme.colors.dark[500])};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};

  svg {
    flex-shrink: 0;
  }
`;

const Input = styled.input<{ hasValue: boolean }>`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  line-height: ${({ theme }) => theme.typography.bodyR.lineHeight};
  font-weight: ${({ theme }) => theme.typography.bodyR.weight};
  color: ${({ theme, hasValue }) => (hasValue ? theme.colors.white : 'inherit')};
  border: none;
  background-color: transparent;
  outline: none;
  user-select: none;
`;

const ClearButton = styled(FaCircleXmark)`
  cursor: pointer;
`;

export default SearchInput;
