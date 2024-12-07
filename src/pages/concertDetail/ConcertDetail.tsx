import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { LuCalendar } from 'react-icons/lu';
import { PiMapPinFill } from 'react-icons/pi';
import { TbChevronDown } from 'react-icons/tb';

import ConcertInfo from './components/ConcertInfo';
import SeatInfo from './components/SeatInfo';

import Badge from 'components/badge/Badge';
import { endPoint } from 'constants/endPoint';
import {
  BodyMediumText,
  BodyRegularText,
  CaptionText,
  TitleText1,
  TitleText2,
} from 'styles/Typography';
import { publicAxios } from 'utils';

export interface ConcertInfoProps {
  data: ConcertDetail | undefined;
}

interface Poster {
  url: string;
}

interface DetailImage {
  url: string;
}

interface DateInfo {
  startDate: string;
  endDate: string;
  timeTable: string;
}

interface ConcertInfo {
  title: string;
  price: string;
  performStatus: string;
  host: string;
  dateInfo: DateInfo;
}

interface Seller {
  name: string;
  salesUrl: string;
}

interface ConvenienceInfo {
  hasParkingLot: boolean;
  hasRestaurant: boolean;
  hasCafe: boolean;
  hasStore: boolean;
  hasDisabledParking: boolean;
  hasDisabledToilet: boolean;
  hasElevator: boolean;
  hasRunway: boolean;
}

export interface ConcertDetail {
  poster: Poster;
  detailImages: DetailImage[];
  concertInfo: ConcertInfo;
  sellers: Seller[];
  hallCode: string;
  hallName: string;
  seatScale: number;
  convenienceInfo: ConvenienceInfo;
  address: string;
}

interface ConcertResponse {
  timeStamp: string;
  code: string;
  message: string;
  result: ConcertDetail;
}
const id = 308;
const ConcertDetail = () => {
  const getConcertDetail = async (id: number): Promise<ConcertResponse> => {
    const { data } = await publicAxios.get(endPoint.GET_CONCERT_DETAIL(id));
    return data;
  };

  const { data } = useQuery({
    queryKey: ['concert', id],
    queryFn: () => getConcertDetail(id),
  });

  return (
    <ConcertDetailContainer>
      <Poster>
        <img alt="detailImg" src={data?.result.poster.url} />
        <BgWrapper>
          <Content>
            <Badge color="gray" size="medium" variant="round">
              공연 예정
            </Badge>
            <TitleText1>{data?.result.concertInfo.title}</TitleText1>
            <VenueInfo>
              <VenuePlace>
                <PiMapPinFill size={20} />
                <BodyRegularText>{data?.result.hallName}</BodyRegularText>
              </VenuePlace>
              <VenueDate>
                <LuCalendar size={20} />
                <BodyRegularText>
                  {data?.result.concertInfo.dateInfo.startDate} -{' '}
                  {data?.result.concertInfo.dateInfo.endDate}
                </BodyRegularText>
              </VenueDate>
            </VenueInfo>
          </Content>
        </BgWrapper>
      </Poster>
      <DetailWrapper>
        <ConcertInfo data={data?.result} />
        <DetailImgContent>
          <TitleText2 className="concertDetail">공연 상세</TitleText2>
          <div>
            <DetailImg alt="detailImg" src={data?.result.detailImages[0]?.url} />
            <IconWrapper>
              <TbChevronDown size={24} />
            </IconWrapper>
          </div>
        </DetailImgContent>
      </DetailWrapper>
      <SeatInfo data={data?.result} />
    </ConcertDetailContainer>
  );
};

const ConcertDetailContainer = styled.div``;

const Poster = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
  }
`;

const BgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  height: 28rem;
  background: linear-gradient(to top, #1b1d1f, rgba(27, 29, 31, 0));
  padding: 0 2.4rem 2.4rem 2.4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const VenueInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const VenuePlace = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const VenueDate = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const DetailImgContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .concertDetail {
    margin-left: 2.4rem;
    color: ${({ theme }) => theme.colors.dark[50]};
  }
`;

const DetailImg = styled.img`
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
`;

export default ConcertDetail;
