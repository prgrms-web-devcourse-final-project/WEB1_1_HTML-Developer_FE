import styled from '@emotion/styled';
import { forwardRef } from 'react';

import SearchInput from 'components/searchInput/SearchInput';
import { BodyRegularText } from 'styles/Typography';

interface SearchFieldProps {
  label: string;
  onSearch: (keyword: string) => void;
  placeholder: string;
  isActive: boolean;
  handleClick: () => void;
}
const SearchField = forwardRef<HTMLDivElement, SearchFieldProps>(
  ({ label, onSearch, placeholder, handleClick, isActive }, ref) => {
    return (
      <SearchFieldContainer>
        <BodyRegularText>
          {label}
          <Mark>*</Mark>
        </BodyRegularText>
        <div onClick={handleClick} ref={ref}>
          <SearchInput isActive={isActive} onSearch={onSearch} text={placeholder} />
        </div>
      </SearchFieldContainer>
    );
  }
);

const SearchFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Mark = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

export default SearchField;
