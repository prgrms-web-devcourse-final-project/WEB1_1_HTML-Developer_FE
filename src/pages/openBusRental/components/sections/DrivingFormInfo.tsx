import { useState } from 'react';

import CheckboxItem from '../items/CheckboxItem';
import RentalFormSelect from '../items/RentalFormSelect';
import RentalInputField from '../items/RentalInputField';
import BoardingDateCheckList from '../lists/BoardingDateCheckList';
import RentalFormField from '../RentalFormField';
import BusInfoSheet from '../sheets/BusInfoSheet';

import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore } from 'stores';
import { useRentalFormStore } from 'stores/rentalFormStore';
import { BUS_SIZE, BUS_TYPE } from 'types';

const DrivingFormInfo = () => {
  const { openModal } = useModalStore(['openModal']);
  const { formData, updateFormData } = useRentalFormStore(['formData', 'updateFormData']);
  const { busSize, busType, maxPassenger, roundPrice, upTimePrice, downTimePrice } = formData;

  const [isSamePrice, setIsSamePrice] = useState(
    roundPrice === upTimePrice && upTimePrice === downTimePrice
  );

  const isBusInfoValid =
    busSize && busType && maxPassenger
      ? `${BUS_SIZE[busSize]} ${BUS_TYPE[busType]} ${maxPassenger}인승`
      : '';

  const handleSelectClick = () => {
    openModal('bottomSheet', 'list', <BusInfoSheet />);
  };

  const handlePriceCheck = () => {
    const price = formData['roundPrice'];

    if (!isSamePrice && price) {
      updateFormData('upTimePrice', price);
      updateFormData('downTimePrice', price);
    }

    setIsSamePrice((prevState) => !prevState);
  };

  const handlePriceBlur = (value: string) => {
    const convertedValue = Number(value.replace(',', ''));
    updateFormData('roundPrice', convertedValue);
    updateFormData('upTimePrice', convertedValue);
    updateFormData('downTimePrice', convertedValue);
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
            <RentalInputField name="upTime" pattern="##:##" />
          </RentalFormField.SubField>
          <RentalFormField.SubField subLabel="하행">
            <RentalInputField name="downTime" pattern="##:##" />
          </RentalFormField.SubField>
        </RentalFormField.Fields>
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="차량 정보" />
        <RentalFormSelect
          name="busInfo"
          onClick={handleSelectClick}
          placeholder={RENTAL_FORM_PLACEHOLDER.busInfo}
          value={isBusInfoValid}
        />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title
          description="차량 대절을 진행할 날짜를 모두 선택해주세요."
          title="운행 일자"
        />
        <BoardingDateCheckList />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="이용 요금">
          <CheckboxItem
            isChecked={isSamePrice}
            name="price"
            onClick={handlePriceCheck}
            value="왕복/편도 동일"
          />
        </RentalFormField.Title>
        <RentalFormField.Fields>
          <RentalFormField.SubField isHorizontal subLabel="왕복">
            <RentalInputField
              isFullWidth={false}
              isNumeric
              name="roundPrice"
              onBlur={(value) => (isSamePrice ? handlePriceBlur(value) : undefined)}
              unit="원"
            />
          </RentalFormField.SubField>
          <RentalFormField.SubField isHorizontal subLabel="상행">
            <RentalInputField
              isDisabled={isSamePrice}
              isFullWidth={false}
              isNumeric
              name="upTimePrice"
              unit="원"
            />
          </RentalFormField.SubField>
          <RentalFormField.SubField isHorizontal subLabel="하행">
            <RentalInputField
              isDisabled={isSamePrice}
              isFullWidth={false}
              isNumeric
              name="downTimePrice"
              unit="원"
            />
          </RentalFormField.SubField>
        </RentalFormField.Fields>
      </RentalFormField>
    </>
  );
};

export default DrivingFormInfo;
