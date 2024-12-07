import styled from '@emotion/styled';
import { BiSolidBus } from 'react-icons/bi';

import RentalFilterSheet from './components/RentalFilterSheet';
import RentalPostItem from './components/RentalPostItem';

import rentalBanner from 'assets/images/bus-rental-banner.png';
import FilterChip from 'components/chips/FilterChip';
import { RENTAL_FILTER } from 'constants/filterTypes';
import { useRentalList } from 'queries/rent/useRentList';
import { useModalStore } from 'stores';
import { useRentalFilterStore } from 'stores/useRentalFilterStore';
import { BodyRegularText } from 'styles/Typography';

const BannerContainer = styled.div`
  width: 100%;
`;

const BannerImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const ContentContainer = styled.div`
  padding: 2.4rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;

const EmptyRentalList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 12rem 0;
`;

const BusRental = () => {
  const { openModal } = useModalStore(['openModal']);
  const { filters } = useRentalFilterStore(['filters']);
  const { data: rentalList } = useRentalList();

  const renderFilterChips = () => {
    return RENTAL_FILTER.map((type) => (
      <FilterChip
        isActive={filters[type].isActive}
        key={type}
        onClick={() => openModal('bottomSheet', 'list', <RentalFilterSheet filterType={type} />)}
      >
        {filters[type].value}
      </FilterChip>
    ));
  };

  return (
    <>
      <BannerContainer>
        <BannerImg alt="Bus Rental Banner" src={rentalBanner} />
      </BannerContainer>
      <ContentContainer>
        <FilterWrapper>{renderFilterChips()}</FilterWrapper>
        {rentalList?.length === 0 ? (
          <EmptyRentalList>
            <BiSolidBus size={80} />
            <BodyRegularText>아직 개설된 차량 대절 폼이 없어요.</BodyRegularText>
          </EmptyRentalList>
        ) : (
          rentalList?.map((item) => <RentalPostItem key={item.rentId} {...item} />)
        )}
      </ContentContainer>
    </>
  );
};

export default BusRental;
