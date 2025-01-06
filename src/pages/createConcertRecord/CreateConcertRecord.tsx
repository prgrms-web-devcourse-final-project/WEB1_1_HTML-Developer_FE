import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { LuCalendar } from 'react-icons/lu';
import { TbChevronDown } from 'react-icons/tb';

import ConcertTime from './components/ConcertTime';

import BaseButton from 'components/buttons/BaseButton';
import ImageField from 'components/imageField/ImageField';
import SearchConcertItem from 'components/items/SearchConcertItem';
import SearchField from 'components/searchField/SearchField';
import DateSheet from 'components/sheets/DateSheet';
import SearchConcertSheet from 'components/sheets/SearchConcertSheet';
import { CONCERT_RECORD_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore } from 'stores';
import { BodyMediumText, BodyRegularText } from 'styles/Typography';
import type { ConcertData } from 'types';

interface FieldStyleProps {
  isError: boolean;
}

const ConcertRecordForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2.4rem;
  padding: 2.4rem;
`;

const ActiveContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
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

const Input = styled.input<FieldStyleProps>`
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

const TextAreaField = styled.textarea<FieldStyleProps>`
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
  outline: 2px solid
    ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
  outline-offset: -2px;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: auto;
`;

const CreateConcertRecord = () => {
  const { openModal } = useModalStore(['openModal']);
  const [concertData, setConcertData] = useState<ConcertData | null>(null);

  const methods = useForm();

  const { control, setValue, watch } = methods;

  const handleConcertSelect = (concertData: ConcertData) => {
    setConcertData(concertData);
    setValue('concertId', concertData.id);
  };

  const handleDateSelect = (date: string) => {
    setValue('date', date);
  };

  return (
    <FormProvider {...methods}>
      <ConcertRecordForm>
        <FormFieldContainer>
          <FormFieldLabel>언제 보셨나요?</FormFieldLabel>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DateSelect
                onClick={() =>
                  openModal(
                    'bottomSheet',
                    'list',
                    <DateSheet onDateSelect={handleDateSelect} title="공연 기록 날짜" />
                  )
                }
              >
                <LuCalendar size={20} />
                <DateSelectValue isValid={field.value}>
                  {field.value || CONCERT_RECORD_PLACEHOLDER.date}
                </DateSelectValue>
                <DropdownIcon size={24} />
              </DateSelect>
            )}
          />
        </FormFieldContainer>
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
        {concertData && watch('date') && (
          <ActiveContent
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <FormFieldContainer>
              <FormFieldLabel>어떤 회차를 보셨나요?</FormFieldLabel>
              <ConcertTimeList>
                {concertData.episodes.map((time) => (
                  <ConcertTime key={time} time={time} />
                ))}
              </ConcertTimeList>
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel>좌석은 어디였나요?</FormFieldLabel>
              <Controller
                control={control}
                name="seatName"
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    isError={!!fieldState.error}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={CONCERT_RECORD_PLACEHOLDER.seatName}
                    type="text"
                  />
                )}
              />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel>공연 기록</FormFieldLabel>
              <TextAreaContainer>
                <Controller
                  control={control}
                  name="content"
                  render={({ field, fieldState }) => (
                    <TextAreaField
                      {...field}
                      isError={!!fieldState.error}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={CONCERT_RECORD_PLACEHOLDER.content}
                    />
                  )}
                />
              </TextAreaContainer>
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel>사진 첨부 (선택)</FormFieldLabel>
              <ImageField />
            </FormFieldContainer>
          </ActiveContent>
        )}
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
    </FormProvider>
  );
};

export default CreateConcertRecord;
