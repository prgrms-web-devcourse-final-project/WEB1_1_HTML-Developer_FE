import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import RentalInputField from '../items/RentalInputField';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import BaseButton from 'components/buttons/BaseButton';
import type { BusInfoSchemaType } from 'schemas';
import { busInfoSchema } from 'schemas';
import { useModalStore } from 'stores';
import { useRentalFormStore } from 'stores';
import { BodyMediumText, BodyRegularText, TitleText2 } from 'styles/Typography';
import type { BusSize, BusType } from 'types';
import { BUS_SIZE, BUS_TYPE } from 'types';

const BusInfoForm = styled.form``;

const BusInfoFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
`;

const BusInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 5.2rem;
`;

const BusInfoLabel = styled(BodyMediumText)``;

const BusInfoList = styled.div`
  display: flex;
  gap: 8px;
`;

const BusInfoItem = styled(BodyRegularText)<{ isActive?: boolean }>`
  min-width: 5.6rem;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.dark[300])};
  cursor: pointer;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BusInfoSheet = () => {
  const { closeModal } = useModalStore(['closeModal']);
  const { formData, updateFormData } = useRentalFormStore(['formData', 'updateFormData']);

  const { busSize, busType, maxPassenger } = formData;

  const methods = useForm<BusInfoSchemaType>({
    resolver: zodResolver(busInfoSchema),
    defaultValues: {
      busSize: busSize ? BUS_SIZE[busSize] : '',
      busType: busType ? BUS_TYPE[busType] : '',
      maxPassenger: maxPassenger ? String(maxPassenger) : '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, control, formState } = methods;

  const findkey = <T extends Record<string, string>>(obj: T, value: string) => {
    return Object.entries(obj).find(([_, v]) => v === value)?.[0] as keyof T | undefined;
  };

  const handleFormSubmit = handleSubmit((busInfoData) => {
    const busSizeValue = findkey(BUS_SIZE, busInfoData.busSize as BusSize);
    const busTypeValue = findkey(BUS_TYPE, busInfoData.busType as BusType);

    if (busSizeValue && busTypeValue && busInfoData.maxPassenger) {
      updateFormData('busSize', busSizeValue);
      updateFormData('busType', busTypeValue);
      updateFormData('maxPassenger', Number(busInfoData.maxPassenger));
    }

    closeModal('bottomSheet', 'list');
  });

  const renderBusInfoSelector = (
    label: string,
    name: keyof BusInfoSchemaType,
    options: typeof BUS_SIZE | typeof BUS_TYPE
  ) => (
    <BusInfoWrapper>
      <BusInfoLabel>{label}</BusInfoLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <BusInfoList>
            {Object.values(options).map((item) => (
              <BusInfoItem
                isActive={field.value === item}
                key={item}
                onClick={() => field.onChange(item)}
              >
                {item}
              </BusInfoItem>
            ))}
          </BusInfoList>
        )}
      />
    </BusInfoWrapper>
  );

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>차량 정보</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <FormProvider {...methods}>
          <BusInfoForm onSubmit={handleFormSubmit}>
            <BusInfoFormContent>
              {renderBusInfoSelector('버스 크기', 'busSize', BUS_SIZE)}
              {renderBusInfoSelector('버스 종류', 'busType', BUS_TYPE)}
              <BusInfoWrapper>
                <BusInfoLabel>탑승 인원</BusInfoLabel>
                <RentalInputField
                  isFullWidth={false}
                  isLive={false}
                  isNumeric
                  name="maxPassenger"
                  unit="인승"
                />
              </BusInfoWrapper>
            </BusInfoFormContent>
            <BaseButton
              color="primary"
              isDisabled={!formState.isValid}
              size="medium"
              type="submit"
              variant="fill"
            >
              선택 완료
            </BaseButton>
          </BusInfoForm>
        </FormProvider>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default BusInfoSheet;
