import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { TbChevronDown } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

import ConcertInfo from './components/ConcertInfo';
import PosterContent from './components/PosterContent';
import SeatInfo from './components/SeatInfo';
import type { ConcertDetailData } from './type';

import { endPoint } from 'constants/endPoint';
import { TitleText2 } from 'styles/Typography';
import { publicAxios } from 'utils';

const ConcertDetail = () => {
  const { id } = useParams();
  const numberId = id ? Number(id) : undefined;

  const getConcertDetail = async (numberId: number): Promise<ConcertDetailData> => {
    const {
      data: { result },
    } = await publicAxios.get(endPoint.GET_CONCERT_DETAIL(numberId));
    return result;
  };

  const { data } = useQuery({
    queryKey: ['concert', numberId],
    queryFn: () => getConcertDetail(numberId!),
    enabled: !!numberId,
  });

  return (
    <div>
      <Poster>
        <img alt="detailImg" src={data?.poster.url} />
        <PosterContent data={data} />
      </Poster>
      <DetailWrapper>
        <ConcertInfo data={data} />
        <DetailImgContent>
          <TitleText2 className="concertDetail">공연 상세</TitleText2>
          <div>
            <img alt="detailImg" src={data?.detailImages[0]?.url} />
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

  img {
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
`;

export default ConcertDetail;
