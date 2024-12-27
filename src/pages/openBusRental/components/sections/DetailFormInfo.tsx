import { useFormContext } from 'react-hook-form';

import RentalFormSelect from '../items/RentalFormSelect';
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
import ValidationMessage from 'components/message/ValidationMessage';
import type { Region } from 'constants/filterTypes';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore, useRentalFormStore } from 'stores';
import type { ConcertData } from 'types';

const DetailFormInfo = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const { openModal } = useModalStore(['openModal']);
  const { formData, concertData, updateConcertData, updateFormData } = useRentalFormStore([
    'formData',
    'concertData',
    'updateConcertData',
    'updateFormData',
  ]);

  const openSheetModal = (sheet: React.ReactNode) => {
    openModal('bottomSheet', 'list', sheet);
  };

  const handleConcertSelect = (concertData: ConcertData) => {
    updateConcertData(concertData);
    updateFormData('concertId', concertData.id);
    setValue('concertId', concertData.id, { shouldValidate: true });
  };

  const handleArtistSelect = (artist: string) => {
    updateFormData('artistName', artist);
    setValue('artistName', artist, { shouldValidate: true });
  };

  const handleArtistDelete = () => {
    updateFormData('artistName', '');
    setValue('artistName', '', { shouldValidate: true });
  };

  const handleRegionChange = (region: Region) => {
    setValue('region', region, { shouldValidate: true });
    updateFormData('region', region);
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
        <SearchField
          name="concert"
          onClick={() =>
            openSheetModal(<SearchConcertSheet onConcertSelect={handleConcertSelect} />)
          }
        />
        {concertData && <SearchConcertItem concertData={concertData} isInactive />}
        {errors.concertId?.message && (
          <ValidationMessage message={errors.concertId.message as string} />
        )}
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="아티스트명" />
        <SearchField
          name="artist"
          onClick={() => openSheetModal(<SearchArtistSheet onArtistSelect={handleArtistSelect} />)}
        />
        {formData.artistName && (
          <SimpleChip hasDeleteIcon onDeleteClick={handleArtistDelete}>
            {formData.artistName}
          </SimpleChip>
        )}
        {errors.artistName?.message && (
          <ValidationMessage message={errors.artistName.message as string} />
        )}
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="지역" />
        <RentalFormSelect
          name="region"
          onClick={() => openSheetModal(<RegionListSheet onChange={handleRegionChange} />)}
          placeholder={RENTAL_FORM_PLACEHOLDER.region}
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
