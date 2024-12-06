import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { BiSolidBus } from 'react-icons/bi';

import RentalPostItem from './components/RentalPostItem';

import rentalBanner from 'assets/images/bus-rental-banner.png';
import FilterChip from 'components/chips/FilterChip';
import { useRentalList } from 'queries/rent/queries/useRentList';
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
  const { data: rentalList } = useRentalList();

  return (
    <>
      <BannerContainer>
        <BannerImg alt="Bus Rental Banner" src={rentalBanner} />
      </BannerContainer>
      <ContentContainer>
        <FilterWrapper>
          <FilterChip isActive={false} onClick={() => {}}>
            지역
          </FilterChip>
          <FilterChip isActive={false} onClick={() => {}}>
            최신순
          </FilterChip>
        </FilterWrapper>
        {rentalList?.length === 0 ? (
          <EmptyRentalList>
            <BiSolidBus size={80} />
            <BodyRegularText>아직 개설된 차량 대절 폼이 없어요.</BodyRegularText>
          </EmptyRentalList>
        ) : (
          rentalList?.map((item) => dayjs() <= dayjs(item.endDate) && <RentalPostItem {...item} />)
        )}
      </ContentContainer>
    </>
  );
};

export default BusRental;
