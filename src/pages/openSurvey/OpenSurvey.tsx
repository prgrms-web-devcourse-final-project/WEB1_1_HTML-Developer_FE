import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import SearchField from './components/SearchField';
import SelectedConcertItem from './components/SelectedConcertItem';

import BaseButton from 'components/buttons/BaseButton';
import SimpleChip from 'components/chips/SimpleChip';
import InputField from 'components/inputField/InputField';
import TitleInputField from 'components/inputField/TitleInputField';
import Select from 'components/select/Select';
import { endPoint } from 'constants/endPoint';
import ConcertItem from 'pages/concert/components/ConcertItem';
import type { Concert } from 'pages/concert/type';
import { BodyRegularText, ChipText } from 'styles/Typography';
import { publicAxios } from 'utils';

interface ConcertResponse {
  timeStamp: Date;
  code: string;
  message: string;
  result: Concert[];
}

interface ArtistResponse {
  timeStamp: Date;
  code: string;
  message: string;
  result: Artist[];
}

interface Artist {
  id: string;
  name: string;
  images: Image[];
}

interface Image {
  url: string;
}

const OpenSurvey = () => {
  const [title, setTitle] = useState('');
  const [etcInfo, setEtcInfo] = useState('');
  const [concertIsActive, setConcertIsActive] = useState(false);
  const [artistIsActive, setArtistIsActive] = useState(false);
  const concertInputRef = useRef<HTMLDivElement>(null);
  const artistInputRef = useRef<HTMLDivElement>(null);

  const [searchResults, setSearchResults] = useState<Concert[]>([]);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  const [artistSearchResult, setArtistSearchResult] = useState<Artist[]>([]);

  const methods = useForm({
    defaultValues: {
      surveyTitle: '',
    },
  });

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const getConcert = async (concertKeyword: string) => {
    const {
      data: { result },
    } = await publicAxios.get<ConcertResponse>(
      `${endPoint.GET_CONCERT_SEARCH}/?query=${encodeURIComponent(concertKeyword)}`
    );

    return result;
  };

  const getArtist = async (artistKeyword: string) => {
    const {
      data: { result },
    } = await publicAxios.get<ArtistResponse>(
      `${endPoint.SEARCH_ARTISTS}?query=${encodeURIComponent(artistKeyword)}`
    );

    return result;
  };

  const handleConcertSearch = async (keyword: string) => {
    const result = await getConcert(keyword);
    setSearchResults(result);
  };

  const handleArtistSearch = async (keyword: string) => {
    const result = await getArtist(keyword);
    setArtistSearchResult(result);
  };

  const handleEtcInfoChange = (value: string | number) => {
    setEtcInfo(value.toString());
  };

  const handleSubmit = () => {};

  const handleConcertClick = () => {
    setConcertIsActive(true);
  };

  const handleConcertSelect = (concert: Concert) => {
    setSelectedConcert(concert);
    setSearchResults([]);
  };

  const handleArtistClick = () => {
    setArtistIsActive(true);
  };

  const handleArtistDelete = () => {
    setArtistSearchResult([]);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (concertInputRef.current && !concertInputRef.current.contains(e.target as Node)) {
        setConcertIsActive(false);
      }

      if (artistInputRef.current && !artistInputRef.current.contains(e.target as Node)) {
        setArtistIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <OpenSurveyContainer>
        <SurveyTitle>
          <BodyRegularText>
            수요 조사 제목<Mark>*</Mark>
          </BodyRegularText>
          <TitleInputField
            maxCount={45}
            name="surveyTitle"
            onValueChange={handleTitleChange}
            placeholder="제목을 입력해주세요"
            value={title}
          />
        </SurveyTitle>
        <SearchField
          handleClick={handleConcertClick}
          isActive={concertIsActive}
          label="공연명"
          onSearch={handleConcertSearch}
          placeholder="공연을 검색해주세요"
          ref={concertInputRef}
        />
        {!selectedConcert &&
          searchResults &&
          searchResults.map((item) => (
            <SelectedConcertItem concert={item} key={item.id} onSelect={handleConcertSelect} />
          ))}
        {selectedConcert && !searchResults.length && (
          <SelectedConcertItem concert={selectedConcert} />
        )}
        <SearchField
          handleClick={handleArtistClick}
          isActive={artistIsActive}
          label="아티스트명"
          onSearch={handleArtistSearch}
          placeholder="아티스트를 검색해주세요"
          ref={artistInputRef}
        />
        {artistSearchResult.length > 0 && (
          <SimpleChip hasDeleteIcon={true} onDeleteClick={handleArtistDelete}>
            {artistSearchResult[0].name}
          </SimpleChip>
        )}
        <BoardingArea>
          <BodyRegularText>
            탑승 지역<Mark>*</Mark>
          </BodyRegularText>
          <Select>지역을 선택해주세요</Select>
        </BoardingArea>
        <RecruitmentCount>
          <BodyRegularText>
            모집 인원 수<Mark>*</Mark>
          </BodyRegularText>
          <Select>인원수를 선택해주세요</Select>
        </RecruitmentCount>
        <RecruitmentDeadline>
          <BodyRegularText>
            마감 기준<Mark>*</Mark>
          </BodyRegularText>
          <ParticipantCount>
            <ChipText>참여 인원 수</ChipText>
            <Select>인원수를 선택해주세요</Select>
          </ParticipantCount>
          <DueDate>
            <ChipText>마감 날짜</ChipText>
            <Select>날짜를 선택해주세요</Select>
          </DueDate>
        </RecruitmentDeadline>
        <EtcInfo>
          <BodyRegularText>기타 안내 사항</BodyRegularText>
          <InputField
            name="EtcInfo"
            onValueChange={handleEtcInfoChange}
            placeholder="내용을 작성해주세요"
            value={etcInfo}
          />
        </EtcInfo>
        <BaseButton
          color="primary"
          isFullWidth={true}
          onClick={handleSubmit}
          size="medium"
          variant="fill"
        >
          작성하기
        </BaseButton>
      </OpenSurveyContainer>
    </FormProvider>
  );
};

const OpenSurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
`;

const SurveyTitle = styled.div``;

const BoardingArea = styled.div``;

const RecruitmentCount = styled.div``;

const RecruitmentDeadline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ParticipantCount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const DueDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const EtcInfo = styled.div``;

const Mark = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

export default OpenSurvey;
