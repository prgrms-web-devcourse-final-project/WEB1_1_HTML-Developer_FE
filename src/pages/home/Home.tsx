import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { LuCalendar } from 'react-icons/lu';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { endPoint } from 'constants/endPoint';
import { BodyRegularText, HeaderText } from 'styles/Typography';
import { publicAxios } from 'utils';

interface Concert {
  id: number;
  poster: string;
  title: string;
  stdate: string;
  eddate: string;
}
const Home = () => {
  const getMainConcert = async () => {
    const response = await publicAxios.get(endPoint.GET_CONCERT_LIST);

    return response.data.result.concertThumbnails;
  };

  const { data } = useQuery<Concert[]>({
    queryKey: ['mainConcerts'],
    queryFn: () => getMainConcert(),
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

export default Home;
