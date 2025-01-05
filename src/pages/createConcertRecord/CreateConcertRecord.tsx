import styled from '@emotion/styled';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuCalendar } from 'react-icons/lu';
import { TbChevronDown } from 'react-icons/tb';

import BaseButton from 'components/buttons/BaseButton';
import ImageField from 'components/imageField/ImageField';
import SearchConcertItem from 'components/items/SearchConcertItem';
import SearchField from 'components/searchField/SearchField';
import SearchConcertSheet from 'components/sheets/SearchConcertSheet';
import { useModalStore } from 'stores';
import { BodyMediumText, BodyRegularText } from 'styles/Typography';
import type { ConcertData } from 'types';

const ConcertRecordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
`;

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FormFieldLabel = styled(BodyMediumText)`
  color: ${({ theme }) => theme.colors.white};
`;

const DateSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.2rem 0 1.6rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  cursor: pointer;
  user-select: none;

  svg {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const DateSelectValue = styled(BodyRegularText)<{ isValid?: boolean }>`
  color: ${({ theme, isValid }) => (isValid ? theme.colors.dark[100] : theme.colors.dark[300])};
`;

const DropdownIcon = styled(TbChevronDown)`
  margin-left: auto;
`;

const ConcertTimeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const ConcertTime = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: 9.2rem;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.dark[300] : theme.colors.dark[500]};
`;

const Input = styled.input<{ isError: boolean }>`
  width: 100%;
  height: 4rem;
  padding: 0 1.6rem;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.dark[100]};
  background: ${({ theme }) => theme.colors.dark[500]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  outline: 2px solid
    ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
  outline-offset: -2px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const TextAreaField = styled.textarea`
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
  min-height: 12rem;
  padding: 1.6rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const CreateConcertRecord = () => {
  const { openModal } = useModalStore(['openModal']);
  const [concertData, setConcertData] = useState<ConcertData | null>(null);

  const { setValue } = useForm();

  const handleConcertSelect = (concertData: ConcertData) => {
    setConcertData(concertData);
    setValue('concertId', concertData.id);
  };

  return (
    <ConcertRecordForm>
      <FormFieldContainer>
        <FormFieldLabel>어떤 콘서트를 보셨나요?</FormFieldLabel>
        <SearchField
          name="concert"
          onClick={() =>
            openModal(
              'bottomSheet',
              'list',
              <SearchConcertSheet isPastSearch onConcertSelect={handleConcertSelect} />
            )
          }
        />
        {concertData && <SearchConcertItem concertData={concertData} isInactive />}
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel>언제 보셨나요?</FormFieldLabel>
        <DateSelect onClick={() => {}}>
          <LuCalendar size={20} />
          <DateSelectValue isValid={false}>날짜를 선택해주세요</DateSelectValue>
          <DropdownIcon size={24} />
        </DateSelect>
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel>어떤 회차를 보셨나요?</FormFieldLabel>
        <ConcertTimeList>
          <ConcertTime isActive={false}>
            <BodyRegularText>14:00</BodyRegularText>
          </ConcertTime>
          <ConcertTime isActive={true}>
            <BodyRegularText>18:00</BodyRegularText>
          </ConcertTime>
        </ConcertTimeList>
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel>좌석은 어디였나요?</FormFieldLabel>
        <Input
          isError={false}
          onChange={() => {}}
          placeholder="예시) 3층 309구역 B열 05번"
          type="text"
        />
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel>공연 기록</FormFieldLabel>
        <TextAreaContainer>
          <TextAreaField onChange={() => {}} placeholder="공연에 대한 간단한 기록을 남겨주세요" />
        </TextAreaContainer>
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel>사진 첨부 (선택)</FormFieldLabel>
        <ImageField />
      </FormFieldContainer>
      <ButtonWrapper>
        <BaseButton
          color="primary"
          isDisabled={false}
          onClick={() => {}}
          size="medium"
          type="button"
          variant="fill"
        >
          등록
        </BaseButton>
      </ButtonWrapper>
    </ConcertRecordForm>
  );
};

export default CreateConcertRecord;
