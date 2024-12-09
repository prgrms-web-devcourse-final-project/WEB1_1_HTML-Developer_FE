import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { LuCalendar } from 'react-icons/lu';
import { TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { endPoint } from 'constants/endPoint';
import RentalPostItem from 'pages/busRental/components/RentalPostItem';
import { BodyRegularText, ChipText, HeaderText, TitleText2 } from 'styles/Typography';
import { publicAxios } from 'utils';

interface RentalPostItem {
  rentId: number;
  endDate: string;
  title: string;
  boardingArea: string;
  imageUrl: string;
}

interface Concert {
  id: number;
  poster: string;
  title: string;
  stdate: string;
  eddate: string;
}
const Home = () => {
  const navigate = useNavigate();
  const getMainConcert = async () => {
    const response = await publicAxios.get(endPoint.GET_CONCERT_LIST);

    return response.data.result.concertThumbnails;
  };

  const getMainRental = async () => {
    const response = await publicAxios.get(endPoint.GET_RENT_MAIN_LIST);

    return response.data.result;
  };

  const { data } = useQuery<Concert[]>({
    queryKey: ['mainConcerts'],
    queryFn: () => getMainConcert(),
  });

  const { data: rentaltData } = useQuery<RentalPostItem[]>({
    queryKey: ['mainRental'],
    queryFn: () => getMainRental(),
  });

  if (!data) return null;

  return (
    <HomeContainer>
      <Swiper className="mySwiper" modules={[Pagination]} pagination={{ clickable: true }}>
        {data.map((concert) => (
          <SwiperSlide key={concert.id}>
            <Poster>
              <img alt="posterImg" src={concert?.poster} />
              <PosterWrapper>
                <HeaderText>{concert?.title}</HeaderText>
                <ConcertDate>
                  <LuCalendar size={20} />
                  <BodyRegularText>
                    {concert?.stdate} - {concert?.eddate}
                  </BodyRegularText>
                </ConcertDate>
              </PosterWrapper>
            </Poster>
          </SwiperSlide>
        ))}
      </Swiper>
      <BustRental>
        <RentalHead>
          <TitleText2>공연 차량 대절</TitleText2>
          <div onClick={() => navigate('/bus-rental')}>
            <ChipText>더보기</ChipText>
            <TbChevronRight size={20} />
          </div>
        </RentalHead>
        {rentaltData?.map((list) => (
          <RentalPostItem
            boardingArea={list.boardingArea}
            endDate={list.endDate}
            imageUrl={list.imageUrl}
            key={list.rentId}
            rentId={list.rentId}
            title={list.title}
          />
        ))}
      </BustRental>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.colors.dark[200]};
  }

  .swiper-pagination-bullet-active {
    width: 1.4rem;
    border-radius: 1.2rem;
    background-color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const Poster = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
  }
`;

const PosterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.2rem;
  position: absolute;
  bottom: 0;
  height: 28rem;
  width: 100%;
  background: linear-gradient(to top, #1b1d1f, rgba(27, 29, 31, 0));
  padding: 0 2.4rem 3.2rem 2.4rem;
`;

const ConcertDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const BustRental = styled.div`
  padding: 2.4rem 2.4rem;
`;

const RentalHead = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

export default Home;
