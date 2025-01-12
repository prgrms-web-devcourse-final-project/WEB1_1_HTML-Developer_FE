import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import FilterChips from './components/FilterChips';
import ListItem from './components/ListItem';
import type { Result } from './type';

import { getConcertHallsList } from 'api/concertHalls';
import { useModalStore } from 'stores';
import { BodyRegularText, HeaderText } from 'styles/Typography';

type Param = [string, string, string] | null;
const ConcertHallsList = () => {
  const { openModal } = useModalStore(['openModal']);
  const [selectedAddress, setSelectedAddress] = useState('지역');
  const [selectedSeatScale, setSelectedSeatScale] = useState(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Result>({
    queryKey: ['concerts', selectedAddress, selectedSeatScale],
    queryFn: async ({ pageParam }) => {
      const {
        data: { result },
      } = await getConcertHallsList(selectedAddress, selectedSeatScale, pageParam as Param);
      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.searchAfter || undefined;
    },
  });

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
  };

  const handleSeatScaleSelect = (seatScale: number) => {
    setSelectedSeatScale(seatScale);
  };

  const handleModalOpen = <T extends string | number>(
    title: string,
    onSelect: (value: T) => void
  ) => {
    openModal('bottomSheet', 'list', <ListItem onSelect={onSelect} title={title} />);
  };

  return (
    <>
      <BannerContainer>
        <HeaderText>공연장 정보</HeaderText>
        <BodyRegularText>ALLREVA에서 공연장 정보들을 확인하세요!</BodyRegularText>
      </BannerContainer>
      <ContentContainer>
        <FilterChips
          handleAddressSelect={handleAddressSelect}
          handleModalOpen={handleModalOpen}
          handleSeatScaleSelect={handleSeatScaleSelect}
          selectedAddress={selectedAddress}
          selectedSeatScale={selectedSeatScale}
        />
      </ContentContainer>
    </>
  );
};

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 16rem;
  padding: 3.2rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[100]};

  h2 {
    color: ${({ theme }) => theme.colors.dark[700]};
  }
  p {
    color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export default ConcertHallsList;
