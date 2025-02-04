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

const SeatReviewItem = (props: SeatReview) => {
  const { openModal } = useModalStore(['openModal']);
  const { seat, concertTitle, content, imageUrls, viewDate, profileImageUrl, nickname, writer } =
    props;

  return (
    <SeatReviewItemContainer>
      <ReviewInfo>
        <ReviewTop>
          <RevierProfile>
            <ProfileImg src={profileImageUrl} />
            <BodyRegularText>{nickname}</BodyRegularText>
          </RevierProfile>
          {writer && (
            <MoreButton onClick={() => openModal('bottomSheet', 'list', <SeatReviewSheet />)}>
              <TbDots size={20} />
            </MoreButton>
          )}
        </ReviewTop>
        <ConcertName>{concertTitle}</ConcertName>
        <SeatName>{seat}</SeatName>
      </ReviewInfo>
      {imageUrls?.filter((x) => x !== null).length !== 0 && (
        <ReviewImageWrapper>
          {imageUrls.map((url) => (
            <ReviewImage key={url} src={url} />
          ))}
        </ReviewImageWrapper>
      )}
      <ReviewContent>
        <BodyRegularText>{content}</BodyRegularText>
        <BodyRegularText>{formatDotDate(viewDate)}</BodyRegularText>
      </ReviewContent>
    </SeatReviewItemContainer>
  );
};

export default SeatReviewItem;
