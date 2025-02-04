import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import RentalItem from './components/RentalItem';

import { requestGetManagingRentalList } from 'api';

const MyRentalManagement = () => {
  const {
    data: managingRentalList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['managingRentals'],
    queryFn: requestGetManagingRentalList,
  });

  return (
    <Wrapper>
      {managingRentalList?.map((rental) => {
        return <RentalItem key={rental.rentId} rental={rental} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2.4rem;
`;

export default MyRentalManagement;
