import { Controller, useFormContext } from 'react-hook-form';

import RentalInputField from '../items/RentalInputField';
import RentalThumbField from '../items/RentalThumbField';
import RentalTitleField from '../items/RentalTitleField';
import SearchField from '../items/SearchField';
import RentalFormField from '../RentalFormField';
import RegionListSheet from '../sheets/RegionListSheet';
import SearchArtistSheet from '../sheets/SearchArtistSheet';
import SearchConcertSheet from '../sheets/SearchConcertSheet';

import Select from 'components/select/Select';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore } from 'stores';

const DetailFormInfo = () => {
  const { setValue, control } = useFormContext();
  const { openModal } = useModalStore(['openModal']);

  const handleConcertClick = () => {
    openModal('bottomSheet', 'list', <SearchConcertSheet onClick={() => {}} />);
  };

  const handleArtistClick = () => {
    openModal('bottomSheet', 'list', <SearchArtistSheet onClick={() => {}} />);
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
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="아티스트명" />
        <SearchField name="artist" onClick={handleArtistClick} />
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
