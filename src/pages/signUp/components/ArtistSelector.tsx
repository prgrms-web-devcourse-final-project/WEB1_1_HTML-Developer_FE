import styled from '@emotion/styled';

import SearchInput from 'components/searchInput/SearchInput';
import { BodyMediumText } from 'styles/Typography';

const ArtistSelector = () => {
  return (
    <Wrapper>
      <BodyMediumText>관심 아티스트명</BodyMediumText>
      <SearchInput isActive={true} onSearch={() => {}} text="아티스트를 검색해주세요" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
  margin-bottom: 13rem;
`;

export default ArtistSelector;
