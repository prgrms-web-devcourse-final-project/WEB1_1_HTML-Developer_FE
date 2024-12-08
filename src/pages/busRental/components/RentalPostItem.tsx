import styled from '@emotion/styled';
import { PiMapPinFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import Badge from 'components/badge/Badge';
import { endPoint } from 'constants/endPoint';
import { ChipText, SmallText } from 'styles/Typography';
import { getDday } from 'utils';

interface RentalPostItemProps {
  rentId: number;
  endDate: string;
  title: string;
  boardingArea: string;
  imageUrl: string;
}

const RentalPostTitle = styled(ChipText)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.8rem;
`;

const RentalItemContainer = styled.li`
  display: flex;
  align-items: stretch;
  gap: 1.6rem;
  position: relative;
  padding: 1.6rem 0;

  &:hover,
  &:active {
    ${RentalPostTitle} {
      color: ${({ theme }) => theme.colors.dark[200]};
      text-decoration: underline;
    }
  }
`;

const RentalItemLink = styled(Link)`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
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

const BoardingArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const RentalPostItem = ({
  rentId,
  endDate,
  title,
  boardingArea,
  imageUrl,
}: RentalPostItemProps) => {
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
      <RentalItemLink to={endPoint.GET_RENT_DETAIL(String(rentId))} />
    </RentalItemContainer>
  );
};

export default RentalPostItem;
