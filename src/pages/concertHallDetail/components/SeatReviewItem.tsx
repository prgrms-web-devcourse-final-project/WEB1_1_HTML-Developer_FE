import styled from '@emotion/styled';
import { TbDots } from 'react-icons/tb';

import SeatReviewSheet from './SeatReviewSheet';

import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';
import type { SeatReview } from 'types';
import { formatDotDate } from 'utils';

const SeatReviewItemContainer = styled.div`
  width: 100%;
  padding: 1.6rem 0;
`;

const ReviewInfo = styled.div`
  padding: 0 2.4rem;
`;

const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RevierProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;

const ProfileImg = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  object-fit: cover;
`;

const MoreButton = styled.button`
  color: ${({ theme }) => theme.colors.dark[200]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[50]};
  }
`;

const ConcertName = styled(BodyRegularText)`
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const SeatName = styled(BodyRegularText)`
  margin-bottom: 1.6rem;
`;

const ReviewImageWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-left: 2.4rem;
  margin-bottom: 1.6rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.dark[500]};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.black};
  }

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ReviewImage = styled.img`
  width: 16rem;
  height: 16rem;
  border-radius: 8px;
  object-fit: cover;
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0 2.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const dummyData = {
  profileImg: 'https://img.danawa.com/prod_img/500000/253/439/img/18439253_1.jpg?_v=20221207094826',
  username: '포차코',
  isWriter: true,
  concertName: 'DAY6 3RD WORLD TOUR, FOREVER YOUNG [인천]',
  seatName: '3층 309구역 G열 05번',
  images: [
    'https://pbs.twimg.com/media/GK9TqisboAAeWIk.jpg:large',
    'https://i.ytimg.com/vi/drfGUB9-qTc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCQa7Viw4-buaWVlPAX5SJGxw0R3g',
    'https://mblogthumb-phinf.pstatic.net/MjAyNDA0MTNfMTEx/MDAxNzEyOTgwNjgwOTUw.QsQuXUDj3u9UicILmMebvnMTwTmXWRI1yw9nxzbRnu0g.zmC3tgzLnNzoz31fK-jBG8m0-1aRvnkRQCwloQXYRQMg.JPEG/SE-247ff122-9c18-4390-906f-97f95880747d.jpg?type=w400',
  ],
  content: '생각보다 잘 보여요',
  date: '2025-01-14',
};

const SeatReviewItem = (props: SeatReview) => {
  const { profileImg, username, isWriter, concertName } = dummyData;
  const { seat, imageUrls, content, viewDate } = props;

  const { openModal } = useModalStore(['openModal']);

  return (
    <SeatReviewItemContainer>
      <ReviewInfo>
        <ReviewTop>
          <RevierProfile>
            <ProfileImg src={profileImg} />
            <BodyRegularText>{username}</BodyRegularText>
          </RevierProfile>
          {isWriter && (
            <MoreButton onClick={() => openModal('bottomSheet', 'list', <SeatReviewSheet />)}>
              <TbDots size={20} />
            </MoreButton>
          )}
        </ReviewTop>
        <ConcertName>{concertName}</ConcertName>
        <SeatName>{seat}</SeatName>
      </ReviewInfo>
      <ReviewImageWrapper>
        {imageUrls.map((url) => (
          <ReviewImage key={url} src={url} />
        ))}
      </ReviewImageWrapper>
      <ReviewContent>
        <BodyRegularText>{content}</BodyRegularText>
        <BodyRegularText>{formatDotDate(viewDate)}</BodyRegularText>
      </ReviewContent>
    </SeatReviewItemContainer>
  );
};

export default SeatReviewItem;
