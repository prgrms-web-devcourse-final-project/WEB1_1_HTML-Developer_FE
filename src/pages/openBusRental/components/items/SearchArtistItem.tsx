import styled from '@emotion/styled';

import { BodyMediumText } from 'styles/Typography';

interface SearchArtistItemProps {
  artistImg: string;
  artistName: string;
  onClick?: (artistName: string) => void;
}

const ArtistItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 1.2rem 0;
  cursor: pointer;
`;

const ArtistImgContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
`;

const ArtistImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArtistName = styled(BodyMediumText)`
  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[100]};
    text-decoration: underline;
  }
`;

const SearchArtistItem = ({ artistImg, artistName, onClick }: SearchArtistItemProps) => {
  const handleConcertClick = () => {
    onClick?.(artistName);
  };

  return (
    <ArtistItemContainer onClick={handleConcertClick}>
      <ArtistImgContainer>
        <ArtistImg alt="Artist Image" src={artistImg} />
      </ArtistImgContainer>
      <ArtistName>{artistName}</ArtistName>
    </ArtistItemContainer>
  );
};

export default SearchArtistItem;
