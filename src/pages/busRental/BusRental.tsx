import styled from '@emotion/styled';
import { BiSolidBus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import RentalPostItem from './components/RentalPostItem';

import rentalBanner from 'assets/images/bus-rental-banner.png';
import FilterBottomSheet from 'components/bottomSheet/FilterBottomSheet';
import FAB from 'components/buttons/FAB';
import FilterChip from 'components/chips/FilterChip';
import { FILTER_TYPE } from 'constants/filterTypes';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useGetRentalList } from 'queries/rent';
import { useModalStore } from 'stores';
import { useFilterStore } from 'stores/filterStore';
import { BodyRegularText } from 'styles/Typography';
import type { FilterType } from 'types';

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

const RentalList = styled.ul`
  list-style: none;
`;

const BusRental = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore(['openModal']);
  const { rentalFilters } = useFilterStore(['rentalFilters']);
  const { data: rentalList, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetRentalList();

  const handleFilterChipClick = (type: FilterType) => {
    openModal('bottomSheet', 'list', <FilterBottomSheet filterType={type} target="rental" />);
  };

  const handleFABClick = () => {
    navigate('/bus-rental/create');
  };

  const renderFilterChips = () => {
    return FILTER_TYPE.map((type) => (
      <FilterChip
        isActive={rentalFilters[type].isActive}
        key={type}
        onClick={() => handleFilterChipClick(type)}
      >
        {rentalFilters[type].value}
      </FilterChip>
    ));
  };

  const targetRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  });

  return (
    <>
      <BannerContainer>
        <BannerImg alt="Bus Rental Banner" src={rentalBanner} />
      </BannerContainer>
      <ContentContainer>
        <FilterWrapper>{renderFilterChips()}</FilterWrapper>
        {rentalList?.pages[0].length === 0 ? (
          <EmptyRentalList>
            <BiSolidBus size={80} />
            <BodyRegularText>아직 개설된 차량 대절 폼이 없어요.</BodyRegularText>
          </EmptyRentalList>
        ) : (
          rentalList?.pages.map((page, pageIndex) => (
            <RentalList key={pageIndex}>
              {page.map((item) => (
                <RentalPostItem key={item.rentId} {...item} />
              ))}
            </RentalList>
          ))
        )}
        <div ref={targetRef} />
      </ContentContainer>
      <FAB onFABClick={handleFABClick} />
    </>
  );
};

export default BusRental;
