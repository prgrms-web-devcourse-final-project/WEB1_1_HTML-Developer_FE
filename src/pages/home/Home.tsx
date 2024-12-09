import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import MainPoster from './components/MainPoster';

import { endPoint } from 'constants/endPoint';
import RentalPostItem from 'pages/busRental/components/RentalPostItem';
import { ChipText, TitleText2 } from 'styles/Typography';
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

  const { data: concerts } = useQuery<Concert[]>({
    queryKey: ['mainConcerts'],
    queryFn: () => getMainConcert(),
  });

  const { data: rentaltData } = useQuery<RentalPostItem[]>({
    queryKey: ['mainRental'],
    queryFn: () => getMainRental(),
  });

  if (!concerts) return null;

  return (
    <HomeContainer>
      <BustRental>
        <MainPoster concerts={concerts} />
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

const HomeContainer = styled.div``;

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
