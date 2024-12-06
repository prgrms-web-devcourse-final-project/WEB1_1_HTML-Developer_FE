import styled from '@emotion/styled';
import { PiMapPinFill } from 'react-icons/pi';

import Badge from 'components/badge/Badge';
import { ChipText, SmallText } from 'styles/Typography';
import { getDday } from 'utils';

interface RentalPostItemProps {
  endDate: string;
  title: string;
  boardingArea: string;
  imageUrl: string;
}

const RentalItemContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1.6rem;
  padding: 1.6rem 0;
`;

const RentalThumbnail = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 9.6rem;
  height: 9.6rem;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const RentalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RentalPostTitle = styled(ChipText)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.8rem;
`;

const BoardingArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const RentalPostItem = ({ endDate, title, boardingArea, imageUrl }: RentalPostItemProps) => {
  const dDay = getDday(endDate);

  return (
    <RentalItemContainer>
      <RentalThumbnail>
        <ThumbnailImg alt="Rental Thumbnail" src={imageUrl} />
      </RentalThumbnail>
      <RentalContent>
        <Badge color={dDay > 3 ? 'gray' : 'red'} size="small" variant="square">
          {dDay === 0 ? `D-Day` : `D-${dDay}`}
        </Badge>
        <RentalPostTitle>{title}</RentalPostTitle>
        <BoardingArea>
          <PiMapPinFill size={16} />
          <SmallText>{boardingArea}</SmallText>
        </BoardingArea>
      </RentalContent>
    </RentalItemContainer>
  );
};

export default RentalPostItem;
