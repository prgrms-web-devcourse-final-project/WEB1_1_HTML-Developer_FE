import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { LuCalendar } from 'react-icons/lu';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import { TbArmchair, TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import RecordDeleteDialog from './RecordDeleteDialog';

import { useGetConcertRecordDetail } from 'queries/concertRecord';
import { useModalStore } from 'stores';
import { BodyRegularText, HeaderText, TitleText2 } from 'styles/Typography';
import { formatDateWithDay } from 'utils';

interface RecordDetailsProps {
  id: string;
}

const RecordDetailContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.2rem;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ActionButton = styled.button`
  color: ${({ theme }) => theme.colors.dark[300]};
  cursor: pointer;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ConcertDetailContainer = styled.div`
  width: 100%;
  padding: 3.2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const ImageSwiper = styled(Swiper)`
  position: relative;
  margin-bottom: 2.4rem;

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.dark[300]};
  }

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RecordImage = styled.div`
  overflow: hidden;
  width: 80%;
  height: 36rem;
  margin: auto;
  border-radius: 0.8rem;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ConcertTitle = styled(HeaderText)`
  margin-bottom: 1.6rem;
`;

const ConcertDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 3.2rem;
`;

const ConcertDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const ConcertRecordLabel = styled(TitleText2)`
  margin-bottom: 1.2rem;
`;

const ConcertRecordContent = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const RecordDetails = ({ id }: RecordDetailsProps) => {
  const navigate = useNavigate();
  const { openModal } = useModalStore(['openModal']);
  const { data: recordData } = useGetConcertRecordDetail(id);

  if (!recordData) return <div>세부 정보가 존재하지 않습니다.</div>;

  const { concertTitle, concertPoster, diaryDate, episode, seatName, diaryImages, content } =
    recordData;

  const images = [concertPoster.url, ...diaryImages.map((image) => image.url)];

  const handleEditRecord = () => {
    navigate(`/concert-record/edit/${id}`, { state: { concertTitle: concertTitle } });
  };

  const handleDeleteRecord = () => {
    openModal('dialog', 'confirm', <RecordDeleteDialog />);
  };

  return (
    <RecordDetailContainer
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <ButtonWrapper>
        <ActionButton onClick={handleEditRecord}>
          <PiPencilSimpleLineBold size={24} />
        </ActionButton>
        <ActionButton onClick={handleDeleteRecord}>
          <TbTrash size={24} />
        </ActionButton>
      </ButtonWrapper>
      <ConcertDetailContainer>
        <ImageSwiper className="mySwiper" modules={[Pagination]} pagination={{ clickable: true }}>
          {images.map((image) => (
            <SwiperSlide key={image}>
              <RecordImage>
                <img alt="recordImage" src={image} />
              </RecordImage>
            </SwiperSlide>
          ))}
        </ImageSwiper>
        <ConcertTitle>{concertTitle}</ConcertTitle>
        <ConcertDetailWrapper>
          <ConcertDetail>
            <LuCalendar size={20} />
            <BodyRegularText>
              {formatDateWithDay(diaryDate)} {episode}
            </BodyRegularText>
          </ConcertDetail>
          <ConcertDetail>
            <TbArmchair size={20} />
            <BodyRegularText>{seatName}</BodyRegularText>
          </ConcertDetail>
        </ConcertDetailWrapper>
        <ConcertRecordLabel>공연 기록</ConcertRecordLabel>
        <ConcertRecordContent>{content}</ConcertRecordContent>
      </ConcertDetailContainer>
    </RecordDetailContainer>
  );
};

export default RecordDetails;
