import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import MainPoster from './components/MainPoster';

import PopularKeyword from 'components/popularKeyword/PopularKeyword';
import { endPoint } from 'constants/endPoint';
import RentalPostItem from 'pages/busRental/components/RentalPostItem';
import SurveyItem from 'pages/surveys/components/SurveyItem';
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

interface SurveyList {
  surveyId: number;
  title: string;
  region: string;
  participationCount: number;
  endDate: string;
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

  const getSurveys = async () => {
    const response = await publicAxios.get(endPoint.GET_SURVEY_LIST);

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

  const { data: surveys } = useQuery<SurveyList[]>({
    queryKey: ['surveysList'],
    queryFn: () => getSurveys(),
  });

  if (!concerts) return null;

  return (
    <HomeContainer>
      <MainPoster concerts={concerts} />
      <PopularKeyword />
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
      <SurveyList>
        <SurveyHead>
          <TitleText2>차량 대절 수요 조사</TitleText2>
          <div onClick={() => navigate('/surveys')}>
            <ChipText>더보기</ChipText>
            <TbChevronRight size={20} />
          </div>
        </SurveyHead>
        {surveys?.map((survey) => (
          <SurveyItem
            endDate={survey.endDate}
            participationCount={survey.participationCount}
            region={survey.region}
            surveyId={survey.surveyId}
            title={survey.title}
          />
        ))}
      </SurveyList>
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

  span {
    cursor: pointer;
  }
`;

const SurveyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0 2.4rem 2.4rem 2.4rem;
`;

const SurveyHead = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.dark[200]};
  }

  span {
    cursor: pointer;
  }
`;

export default Home;
