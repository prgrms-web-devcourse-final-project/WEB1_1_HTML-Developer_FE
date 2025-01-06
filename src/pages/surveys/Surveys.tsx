import styled from '@emotion/styled';
import { TbClipboardText } from 'react-icons/tb';

import SurveyItem from './components/SurveyItem';

import FilterBottomSheet from 'components/bottomSheet/FilterBottomSheet';
import FilterChip from 'components/chips/FilterChip';
import { FILTER_TYPE } from 'constants/filterTypes';
import { useIntersectionObserver } from 'hooks';
import { useGetSurveyList } from 'queries/survey';
import { useModalStore } from 'stores';
import { useFilterStore } from 'stores/filterStore';
import { BodyRegularText, HeaderText } from 'styles/Typography';
import type { FilterType } from 'types';

const Surveys = () => {
  const { surveyFilters } = useFilterStore(['surveyFilters']);

  const {
    data: surveyList,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSurveyList();

  const { openModal } = useModalStore(['openModal']);

  const handleFilterChipClick = (type: FilterType) => {
    openModal('bottomSheet', 'list', <FilterBottomSheet filterType={type} target="survey" />);
  };

  const renderFilterChips = () => {
    return FILTER_TYPE.map((type) => (
      <FilterChip
        isActive={surveyFilters[type].isActive}
        key={type}
        onClick={() => handleFilterChipClick(type)}
      >
        {surveyFilters[type].value}
      </FilterChip>
    ));
  };

  const targetRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>ERROR</div>;

  return (
    <>
      <BannerContainer>
        <HeaderText>수요 조사 신청</HeaderText>
        <BodyRegularText>ALLREVA에서 차량 대절 수요 조사를 신청하세요!</BodyRegularText>
      </BannerContainer>

      <ContentContainer>
        <FilterWrapper>{renderFilterChips()}</FilterWrapper>
        {surveyList?.pages[0].length === 0 ? (
          <EmptySurveyList>
            <TbClipboardText size={80} />
            <BodyRegularText>아직 등록된 수요 조사가 없어요.</BodyRegularText>
          </EmptySurveyList>
        ) : (
          <SurveyList>
            {surveyList?.pages.map((page) =>
              page.map((item) => <SurveyItem key={item.surveyId} {...item} />)
            )}
          </SurveyList>
        )}
        <div ref={targetRef} />
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

const FilterWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;
const EmptySurveyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 12rem 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const SurveyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default Surveys;
