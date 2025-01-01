import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { BsDash } from 'react-icons/bs';
import { IoMdArrowDropup } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { TbChevronUp } from 'react-icons/tb';

import { endPoint } from 'constants/endPoint';
import theme from 'styles/theme';
import { BodyMediumText, BodyRegularText, CaptionText, TitleText2 } from 'styles/Typography';
import { publicAxios } from 'utils';

type StatusIcons = Record<string, React.ReactNode>;

interface PopularKeywordResponse {
  timeStamp: string;
  code: string;
  message: string;
  result: Result[];
}

interface Result {
  rank: number;
  keyword: string;
  changeStatus: string;
}

const icons: StatusIcons = {
  STAY: <BsDash color={theme.colors.dark[200]} size={20} />,
  UP: <IoMdArrowDropup color={theme.colors.red} size={20} />,
  DOWN: <IoMdArrowDropdown color={theme.colors.dark[200]} size={20} />,
};
const PopularKeyword = () => {
  const fetchPopularKeyword = async () => {
    const { data } = await publicAxios.get<PopularKeywordResponse>(endPoint.SEARCH_POPULAR_KEYWORD);

    return data;
  };

  const { data } = useQuery({ queryKey: ['popular-keyword'], queryFn: fetchPopularKeyword });

  return (
    <PopularKeywordContainer>
      <PopularKeywordHeader>
        <TextInfo>
          <TitleText2>실시간 인기 검색어</TitleText2>
          <CaptionText>{data?.timeStamp.split('T')[0].replace(/-/g, '.')}</CaptionText>
        </TextInfo>
        <TbChevronUp size={24} />
      </PopularKeywordHeader>
      <Ranking>
        {data?.result.map((item) => (
          <KeywordItem key={item.rank}>
            {icons[item.changeStatus] || null}
            <BodyMediumText className="rankText">
              {item.rank.toString().length === 1
                ? item.rank.toString().padStart(2, '0')
                : item.rank}
            </BodyMediumText>
            <BodyRegularText className="keywordText">{item.keyword}</BodyRegularText>
          </KeywordItem>
        ))}
      </Ranking>
    </PopularKeywordContainer>
  );
};

const PopularKeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  height: fit-content;
  padding: 1.6rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};

  svg {
    cursor: pointer;
  }
`;

const PopularKeywordHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h4 {
    color: ${({ theme }) => theme.colors.dark[50]};
  }

  caption {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const KeywordItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  .rankText {
    margin-right: 0.4rem;
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  .keywordText {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const Ranking = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.2rem;
`;

export default PopularKeyword;
