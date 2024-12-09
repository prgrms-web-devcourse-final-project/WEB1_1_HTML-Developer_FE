import styled from '@emotion/styled';
import { LuCalendar } from 'react-icons/lu';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BodyRegularText, HeaderText } from 'styles/Typography';

interface Concert {
  id: number;
  poster: string;
  title: string;
  stdate: string;
  eddate: string;
}

interface MainPosterProps {
  concerts: Concert[];
}
const MainPoster = ({ concerts }: MainPosterProps) => {
  return (
    <MainPosterContainer>
      <Swiper className="mySwiper" modules={[Pagination]} pagination={{ clickable: true }}>
        {concerts.map((concert) => (
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
    </MainPosterContainer>
  );
};

const MainPosterContainer = styled.div`
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

export default MainPoster;
