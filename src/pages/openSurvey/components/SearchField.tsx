import styled from '@emotion/styled';
import { useState } from 'react';

import SearchInput from 'components/searchInput/SearchInput';
import { BodyRegularText } from 'styles/Typography';

interface SearchFieldProps {
  label: string;
  onSearch: (keyword: string) => void;
  placeholder: string;
}
const SearchField = ({ label, onSearch, placeholder }: SearchFieldProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <SearchFieldContainer>
      <BodyRegularText>
        {label}
        <Mark>*</Mark>
      </BodyRegularText>
      <div onClick={() => setIsActive(true)}>
        <SearchInput isActive={isActive} onSearch={onSearch} text={placeholder} />
      </div>
    </SearchFieldContainer>
  );
};

const SearchFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Mark = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

export default SearchField;
