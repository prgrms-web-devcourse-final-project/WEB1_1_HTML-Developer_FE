import styled from '@emotion/styled';

import type { ConcertDetail, ConcertInfoProps } from '../ConcertDetail';

import { BodyRegularText } from 'styles/Typography';

interface InfoItem {
  label: string;
  value: string | string[];
}
const ConcertInfoItem = ({ label, value }: InfoItem) => (
  <ItemContainer>
    <BodyRegularText className="label">{label}</BodyRegularText>
    <BodyRegularText>{value}</BodyRegularText>
  </ItemContainer>
);

const ConcertInfo = ({ data }: ConcertInfoProps) => {
  const infoItems: InfoItem[] = [
    {
      label: '지역',
      value: data?.address.split(' ')[0] || '',
    },
    {
      label: '주최',
      value: data?.concertInfo.host || '',
    },
    {
      label: '예매처',
      value: data?.sellers.map((seller) => seller.name) || [],
    },
    {
      label: '티켓 가격',
      value: data?.concertInfo.price || '',
    },
  ];
  return (
    <Container>
      {infoItems.map((item, index) => (
        <ConcertInfoItem key={index} label={item.label} value={item.value} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 2.4rem;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 7rem 1fr;

  .label {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

export default ConcertInfo;
