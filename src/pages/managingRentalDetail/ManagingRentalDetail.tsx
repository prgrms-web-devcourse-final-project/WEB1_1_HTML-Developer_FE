import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { requestGetManagingRentalDetail } from 'api';
import Badge from 'components/badge/Badge';

const ManagingRentalDetail = () => {
  const { id } = useParams();

  const { data: managingRentalDetail } = useSuspenseQuery({
    queryKey: ['managingRentalDetail'],
    queryFn: async () => {
      const data = await requestGetManagingRentalDetail(id as string, '2025-01-18');
      return data.result;
    },
  });

  console.log(managingRentalDetail);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{managingRentalDetail.title}</Title>
        <Badge size="medium" variant="square">
          {managingRentalDetail.isClosed ? '마감' : '모집중'}
        </Badge>
      </TitleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2.4rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: #6366f1;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  flex: 1;
`;

const HeaderSection = styled.div``;

const InfoSection = styled.div``;

export default ManagingRentalDetail;
