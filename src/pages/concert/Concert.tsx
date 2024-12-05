import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LuCalendar } from 'react-icons/lu';

import FilterChips from './components/FilterChips';
import ListItem from './components/ListItem';
import type { FilterCategory, Result } from './type';

import { getConcertList } from 'api/concerts';
import { useModalStore } from 'stores';
import { BodyRegularText, ChipText, HeaderText, SmallText } from 'styles/Typography';

const PAGE_SIZE = 7;

const Concert = () => {
  const { openModal } = useModalStore(['openModal']);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedDirection, setSelectedDirection] = useState('DATE');

  const { data } = useQuery<Result>({
    queryKey: ['concerts', selectedRegion, selectedDirection, PAGE_SIZE],
    queryFn: async () => {
      const {
        data: { result },
      } = await getConcertList(selectedRegion, selectedDirection, PAGE_SIZE);
      return result;
    },
  });

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const handleDirectionSelect = (sortDirection: string) => {
    setSelectedDirection(sortDirection);
  };

  const handleModalOpen = (title: FilterCategory, onSelect: (value: string) => void) => {
    openModal('bottomSheet', 'list', <ListItem onSelect={onSelect} title={title} />);
  };

  return (
    <ConcertContainer>
      <ExpectedConcert>
        <HeaderText>예정 공연</HeaderText>
        <BodyRegularText>ALLREVA에서 예정된 공연들을 손쉽게 확인해보세요!</BodyRegularText>
      </ExpectedConcert>
      <FilterChips
        handleDirectionSelect={handleDirectionSelect}
        handleModalOpen={handleModalOpen}
        handleRegionSelect={handleRegionSelect}
        selectedDirection={selectedDirection}
        selectedRegion={selectedRegion}
      />
      <ConcertList>
        {data?.concertThumbnails.map((concert) => (
          <ConcertItem key={concert.id}>
            <img alt="posterImg" src={concert.poster} />
            <Content>
              <ChipText className="title">{concert.title}</ChipText>
              <ConcertInfo>
                <SmallText>{concert.concertHallName}</SmallText>
                <Place>
                  <LuCalendar size={16} />
                  <SmallText>
                    {concert.stdate} - {concert.eddate}
                  </SmallText>
                </Place>
              </ConcertInfo>
            </Content>
          </ConcertItem>
        ))}
      </ConcertList>
    </ConcertContainer>
  );
};

const ConcertContainer = styled.div``;

const ExpectedConcert = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 3.3rem 2.4rem;
  width: 100%;
  height: 16rem;
  background-color: ${({ theme }) => theme.colors.dark[100]};

  h2 {
    color: ${({ theme }) => theme.colors.dark[700]};
  }

  p {
    color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const ConcertList = styled.div`
  width: 100%;
  padding: 2.4rem;
`;

const ConcertItem = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1.2rem 0;

  img {
    width: 7.5rem;
    height: 10rem;

    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  .title {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const Place = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ConcertInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

export default Concert;
