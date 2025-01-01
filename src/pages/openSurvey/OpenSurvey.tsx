import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import CalendarBottomSheet from './components/CalendarBottomSheet';
import SearchField from './components/SearchField';
import SelectedConcertItem from './components/SelectedConcertItem';
import type { Artist, ArtistResponse, ConcertResponse, SurveyFormData } from './type';

import BaseButton from 'components/buttons/BaseButton';
import Checkbox from 'components/checkbox/Checkbox';
import SimpleChip from 'components/chips/SimpleChip';
import InputField from 'components/inputField/InputField';
import TitleInputField from 'components/inputField/TitleInputField';
import Select from 'components/select/Select';
import { endPoint } from 'constants/endPoint';
import ListItem from 'pages/concert/components/ListItem';
import type { Concert } from 'pages/concert/type';
import { useModalStore } from 'stores';
import { BodyRegularText, ChipText } from 'styles/Typography';
import { getDateRange, publicAxios, tokenAxios } from 'utils';

const OpenSurvey = () => {
  const [title, setTitle] = useState('');
  const [etcInfo, setEtcInfo] = useState('');
  const [concertIsActive, setConcertIsActive] = useState(false);
  const [artistIsActive, setArtistIsActive] = useState(false);
  const concertInputRef = useRef<HTMLDivElement>(null);
  const artistInputRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModalStore(['openModal']);

  const [searchResults, setSearchResults] = useState<Concert[]>([]);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  const [artistSearchResult, setArtistSearchResult] = useState<Artist[]>([]);

  const [concertDateRange, setConcertDateRange] = useState<string[]>([]);
  const [boardingDates, setBoardingDates] = useState<string[]>([]);

  const navigate = useNavigate();

  const methods = useForm<SurveyFormData>({
    defaultValues: {
      title: '',
      concertId: null,
      boardingDates: [],
      artistName: '',
      region: '',
      endDate: '',
      maxPassenger: '',
      information: '',
    },
  });

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setValue('title', value);
  };

  const { watch, setValue, handleSubmit } = methods;

  const region = watch('region');
  const maxPassenger = watch('maxPassenger');
  const endDate = watch('endDate');

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

    if (result.length > 0) {
      setValue('artistName', result[0].name);
    }
  };

  const handleEtcInfoChange = (value: string | number) => {
    setEtcInfo(value.toString());
    setValue('information', value.toString());
  };

  const handleConcertClick = () => {
    setConcertIsActive(true);
  };

  const handleArtistClick = () => {
    setArtistIsActive(true);
  };

  const handleArtistDelete = () => {
    setArtistSearchResult([]);
  };

  const handleRegionModalOpen = () => {
    openModal('bottomSheet', 'list', <ListItem onSelect={handleRegionSelect} title="지역" />);
  };

  const handlePersonnelModalOpen = () => {
    openModal('bottomSheet', 'list', <ListItem onSelect={handlePersonnelSelect} title="인원수" />);
  };

  const handleCalendarModalOpen = () => {
    openModal('bottomSheet', 'basic', <CalendarBottomSheet onSelect={handleDateSelect} />);
  };

  const handleRegionSelect = (value: string) => {
    setValue('region', value);
  };

  const handleDateSelect = (date: string) => {
    setValue('endDate', date);
  };

  const handlePersonnelSelect = (value: string) => {
    setValue('maxPassenger', value);
  };

  const handleConcertSelect = (concert: Concert) => {
    setSelectedConcert(concert);
    setValue('concertId', concert.id);
    setSearchResults([]);
  };

  const handleCheck = (date: string, check: boolean) => {
    let newDates;

    if (check) {
      newDates = [...boardingDates, date];
    } else {
      newDates = boardingDates.filter((day) => day !== date);
    }

    setBoardingDates(newDates);
    setValue('boardingDates', newDates);
  };

  const onSubmit = async (data: SurveyFormData) => {
    try {
      const response = await tokenAxios.post(endPoint.CREATE_SURVEY_FORM, {
        title: data.title,
        concertId: selectedConcert?.id || 0,
        boardingDates: data.boardingDates,
        artistName: artistSearchResult[0]?.name || '',
        region: data.region,
        maxPassenger: Number(data.maxPassenger),
        endDate: data.endDate,
        information: data.information,
      });

      if (response.data) {
        navigate('/surveys');
      }

      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (selectedConcert) {
      const dateRange = getDateRange(selectedConcert.stdate, selectedConcert.eddate);
      setConcertDateRange(dateRange);
    }
  }, [selectedConcert]);

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
      <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
        <OpenSurveyContainer>
          <SurveyTitle>
            <BodyRegularText>
              수요 조사 제목<Mark>*</Mark>
            </BodyRegularText>
            <TitleInputField
              maxCount={45}
              name="title"
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
          {selectedConcert && (
            <OperationDate>
              <BodyRegularText>
                운행 일자<Mark>*</Mark>
              </BodyRegularText>
              {concertDateRange.map((date) => (
                <Checkbox key={date} onCheck={handleCheck} text={date.toString()} />
              ))}
            </OperationDate>
          )}
          <BoardingArea>
            <BodyRegularText>
              탑승 지역<Mark>*</Mark>
            </BodyRegularText>
            <Select onClick={handleRegionModalOpen} value={region}>
              지역을 선택해주세요
            </Select>
          </BoardingArea>
          <RecruitmentDeadline>
            <BodyRegularText>
              마감 기준<Mark>*</Mark>
            </BodyRegularText>
            <ParticipantCount>
              <ChipText>참여 인원 수</ChipText>
              <Select onClick={handlePersonnelModalOpen} value={maxPassenger}>
                인원수를 선택해주세요
              </Select>
            </ParticipantCount>
            <DueDate>
              <ChipText>마감 날짜</ChipText>
              <Select onClick={handleCalendarModalOpen} value={endDate}>
                날짜를 선택해주세요
              </Select>
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
          <BaseButton color="primary" isFullWidth={true} size="medium" type="submit" variant="fill">
            작성하기
          </BaseButton>
        </OpenSurveyContainer>
      </form>
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

const OperationDate = styled.div``;

const BoardingArea = styled.div``;

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
