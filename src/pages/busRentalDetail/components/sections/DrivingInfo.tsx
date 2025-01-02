import styled from '@emotion/styled';
import { join, sortBy, uniq } from 'lodash-es';

import { BodyRegularText } from 'styles/Typography';
import type { BusSize, BusType } from 'types';
import { BUS_SIZE, BUS_TYPE } from 'types';
import { formatDateRange } from 'utils';

interface DrivingInfoProps {
  rentDates: string[];
  boardingArea: string;
  maxPassenger: number;
  busSize: BusSize;
  busType: BusType;
  busPrices: number[];
}

const DrivingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 0.8rem;
  padding: 1.6rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const DrivingInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const DrivingInfoLabel = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const DrivingInfo = ({
  rentDates,
  boardingArea,
  maxPassenger,
  busSize,
  busType,
  busPrices,
}: DrivingInfoProps) => {
  const sortedPrices = sortBy(uniq(busPrices));

  return (
    <DrivingInfoContainer>
      <DrivingInfoItem>
        <DrivingInfoLabel>운행 기간</DrivingInfoLabel>
        <BodyRegularText>
          {formatDateRange(rentDates[0], rentDates[rentDates.length - 1])}
        </BodyRegularText>
      </DrivingInfoItem>
      <DrivingInfoItem>
        <DrivingInfoLabel>탑승 장소</DrivingInfoLabel>
        <BodyRegularText>{boardingArea}</BodyRegularText>
      </DrivingInfoItem>
      <DrivingInfoItem>
        <DrivingInfoLabel>차량 정보</DrivingInfoLabel>
        <BodyRegularText>{`${maxPassenger}인승 ${BUS_SIZE[busSize]} ${BUS_TYPE[busType]}버스`}</BodyRegularText>
      </DrivingInfoItem>
      <DrivingInfoItem>
        <DrivingInfoLabel>이용 요금</DrivingInfoLabel>
        <BodyRegularText>
          {join(
            sortedPrices.map((price) => `${new Intl.NumberFormat().format(price)}원`),
            ' | '
          )}
        </BodyRegularText>
      </DrivingInfoItem>
    </DrivingInfoContainer>
  );
};

export default DrivingInfo;
