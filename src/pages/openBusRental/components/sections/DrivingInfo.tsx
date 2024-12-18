import { Controller, useFormContext } from 'react-hook-form';

import CheckboxItem from '../items/CheckboxItem';
import RentalInputField from '../items/RentalInputField';
import BoardingDateCheckbox from '../lists/BoardingDateCheckBox';
import RentalFormField from '../RentalFormField';
import BusInfoSheet from '../sheets/BusInfoSheet';

import Select from 'components/select/Select';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore } from 'stores';

const DrivingInfo = () => {
  const { control } = useFormContext();
  const { openModal } = useModalStore(['openModal']);

  const handleSelectClick = () => {
    openModal('bottomSheet', 'list', <BusInfoSheet onChange={() => {}} />);
  };

  return (
    <>
      <RentalFormField>
        <RentalFormField.Title title="출발 장소" />
        <RentalInputField name="boardingArea" />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="출발 시각" />
        <RentalFormField.Fields isHorizontal>
          <RentalFormField.SubField subLabel="상행">
            <RentalInputField name="upTime" />
          </RentalFormField.SubField>
          <RentalFormField.SubField subLabel="하행">
            <RentalInputField name="downTime" />
          </RentalFormField.SubField>
        </RentalFormField.Fields>
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="차량 정보" />
        <Controller
          control={control}
          name="busInfo"
          render={({ field }) => (
            <Select {...field} onClick={handleSelectClick}>
              {RENTAL_FORM_PLACEHOLDER.busInfo}
            </Select>
          )}
        />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title
          description="차량 대절을 진행할 날짜를 모두 선택해주세요."
          title="운행 일자"
        />
        <BoardingDateCheckbox />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="이용 요금">
          <CheckboxItem isChecked={false} name="price" onClick={() => {}} value="왕복/편도 동일" />
        </RentalFormField.Title>
        <RentalFormField.Fields>
          <RentalFormField.SubField isHorizontal subLabel="왕복">
            <RentalInputField isFullWidth={false} name="roundPrice" unit="원" />
          </RentalFormField.SubField>
          <RentalFormField.SubField isHorizontal subLabel="상행">
            <RentalInputField isFullWidth={false} name="upTimePrice" unit="원" />
          </RentalFormField.SubField>
          <RentalFormField.SubField isHorizontal subLabel="하행">
            <RentalInputField isFullWidth={false} name="downTimePrice" unit="원" />
          </RentalFormField.SubField>
        </RentalFormField.Fields>
      </RentalFormField>
    </>
  );
};

export default DrivingInfo;
