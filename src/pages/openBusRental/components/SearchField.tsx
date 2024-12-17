import styled from '@emotion/styled';
import { IoSearch } from 'react-icons/io5';

import type { SearchPlaceholderKeys } from 'constants/placeholder';
import { SEARCH_PLACEHOLDER } from 'constants/placeholder';
import { BodyRegularText } from 'styles/Typography';

interface SearchInputFieldProps {
  name: SearchPlaceholderKeys;
  onClick: () => void;
}

const SearchInputField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 4rem;
  padding: 1.2rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[300]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  line-height: ${({ theme }) => theme.typography.bodyR.lineHeight};
  cursor: pointer;

  svg {
    flex-shrink: 0;
  }

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.dark[700]};
  }
`;

const SearchValue = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const SearchField = ({ name, onClick }: SearchInputFieldProps) => {
  return (
    <SearchInputField onClick={onClick}>
      <IoSearch size={20} />
      <SearchValue>{SEARCH_PLACEHOLDER[name]}</SearchValue>
    </SearchInputField>
  );
};

export default SearchField;
