import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { LuCalendar } from 'react-icons/lu';
import { PiMapPinFill } from 'react-icons/pi';
import { TbChevronDown } from 'react-icons/tb';

import ConcertInfo from './components/ConcertInfo';
import SeatInfo from './components/SeatInfo';
import type { ConcertDetailData } from './type';

import Badge from 'components/badge/Badge';
import { endPoint } from 'constants/endPoint';
import { BodyRegularText, TitleText1, TitleText2 } from 'styles/Typography';
import { publicAxios } from 'utils';

const id = 308;
const ConcertDetail = () => {
  const getConcertDetail = async (id: number): Promise<ConcertDetailData> => {
    const {
      data: { result },
    } = await publicAxios.get(endPoint.GET_CONCERT_DETAIL(id));
    return result;
  };

  const { data } = useQuery({
    queryKey: ['concert', id],
    queryFn: () => getConcertDetail(id),
  });

  return (
    <div>
      <Poster>
        <img alt="detailImg" src={data?.poster.url} />
        <BgWrapper>
          <Content>
            <Badge color="gray" size="medium" variant="round">
              공연 예정
            </Badge>
            <TitleText1>{data?.concertInfo.title}</TitleText1>
            <VenueInfo>
              <VenuePlace>
                <PiMapPinFill size={20} />
                <BodyRegularText>{data?.hallName}</BodyRegularText>
              </VenuePlace>
              <VenueDate>
                <LuCalendar size={20} />
                <BodyRegularText>
                  {data?.concertInfo.dateInfo.startDate} - {data?.concertInfo.dateInfo.endDate}
                </BodyRegularText>
              </VenueDate>
            </VenueInfo>
          </Content>
        </BgWrapper>
      </Poster>
      <DetailWrapper>
        <ConcertInfo data={data} />
        <DetailImgContent>
          <TitleText2 className="concertDetail">공연 상세</TitleText2>
          <div>
            <DetailImg alt="detailImg" src={data?.detailImages[0]?.url} />
            <IconWrapper>
              <TbChevronDown size={24} />
            </IconWrapper>
          </div>
        </DetailImgContent>
      </DetailWrapper>
      <SeatInfo data={data} />
    </div>
  );
};

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
