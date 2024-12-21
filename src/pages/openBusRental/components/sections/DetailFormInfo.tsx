import { Controller, useFormContext } from 'react-hook-form';

import RentalInputField from '../items/RentalInputField';
import RentalThumbField from '../items/RentalThumbField';
import RentalTitleField from '../items/RentalTitleField';
import SearchConcertItem from '../items/SearchConcertItem';
import SearchField from '../items/SearchField';
import RentalFormField from '../RentalFormField';
import RegionListSheet from '../sheets/RegionListSheet';
import SearchArtistSheet from '../sheets/SearchArtistSheet';
import SearchConcertSheet from '../sheets/SearchConcertSheet';

import SimpleChip from 'components/chips/SimpleChip';
import Select from 'components/select/Select';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore } from 'stores';
import { useRentalFormStore } from 'stores/useRentalFormStore';
import type { ConcertData } from 'types';

const DetailFormInfo = () => {
  const { setValue, control } = useFormContext();
  const { openModal } = useModalStore(['openModal']);
  const { formData, concertData, updateConcertData, updateFormData } = useRentalFormStore([
    'formData',
    'concertData',
    'updateConcertData',
    'updateFormData',
  ]);

  const handleConcertSelect = (concertData: ConcertData) => {
    updateConcertData(concertData);
    setValue('concertId', concertData.id, { shouldValidate: true });
  };

  const handleConcertClick = () => {
    openModal(
      'bottomSheet',
      'list',
      <SearchConcertSheet onConcertSelect={(data) => handleConcertSelect(data)} />
    );
  };

  const handleArtistSelect = (artist: string) => {
    updateFormData('artistName', artist);
    setValue('artistName', artist, { shouldValidate: true });
  };

  const handleArtistClick = () => {
    openModal(
      'bottomSheet',
      'list',
      <SearchArtistSheet onArtistSelect={(artist) => handleArtistSelect(artist)} />
    );
  };

  const handleArtistDelete = () => {
    updateFormData('artistName', '');
    setValue('artistName', '', { shouldValidate: true });
  };

  const handleSelectClick = () => {
    openModal(
      'bottomSheet',
      'list',
      <RegionListSheet
        onChange={(region) => setValue('region', region, { shouldValidate: true })}
      />
    );
  };

  return (
    <>
      <RentalFormField>
        <RentalFormField.Title title="메인 이미지" />
        <RentalThumbField />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="글 제목" />
        <RentalTitleField name="title" />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title
          description="2달 이내 예정된 공연만 개설할 수 있습니다."
          title="공연명"
        />
        <SearchField name="concert" onClick={handleConcertClick} />
        {concertData && <SearchConcertItem concertData={concertData} isInactive />}
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="아티스트명" />
        <SearchField name="artist" onClick={handleArtistClick} />
        {formData.artistName && (
          <SimpleChip hasDeleteIcon onDeleteClick={handleArtistDelete}>
            {formData.artistName}
          </SimpleChip>
        )}
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="지역" />
        <Controller
          control={control}
          name="region"
          render={({ field }) => (
            <Select {...field} onClick={handleSelectClick}>
              {RENTAL_FORM_PLACEHOLDER.region}
            </Select>
          )}
        />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="입금 정보" />
        <RentalInputField name="depositAccount" />
      </RentalFormField>
    </>
  );
};

export default DetailFormInfo;
