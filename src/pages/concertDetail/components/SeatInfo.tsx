import styled from '@emotion/styled';
import { PiMapPinFill } from 'react-icons/pi';
import { TbArmchair, TbCheck } from 'react-icons/tb';

import type { ConcertInfoProps } from '../type';

import { BodyMediumText, CaptionText, TitleText2 } from 'styles/Typography';

const SeatInfo = ({ data }: ConcertInfoProps) => {
  return (
    <SeatInfoContainer>
      <TitleText2>공연장 및 좌석 정보</TitleText2>
      <SeatWrapper>
        <BodyMediumText>{data?.hallName}</BodyMediumText>
        <SeatContent>
          <div>
            <PiMapPinFill size={18} />
            <CaptionText>{data?.address}</CaptionText>
          </div>
          <SeatBox>
            <div>
              <TbArmchair size={18} />
              <CaptionText>{data?.seatScale.toLocaleString()}석</CaptionText>
            </div>
            <div>
              <TbCheck size={18} />
            </div>
          </SeatBox>
        </SeatContent>
      </SeatWrapper>
    </SeatInfoContainer>
  );
};

const SeatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 2.4rem 2.4rem 2.4rem;
`;

const SeatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  padding: 1.6rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const SeatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};

  div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

const SeatBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export default SeatInfo;
