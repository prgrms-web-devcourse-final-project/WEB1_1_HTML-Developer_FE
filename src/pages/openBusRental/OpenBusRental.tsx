import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AdditionalFormInfo from './components/sections/AdditionalFormInfo';
import DetailFormInfo from './components/sections/DetailFormInfo';
import DrivingFormInfo from './components/sections/DrivingFormInfo';

import BaseButton from 'components/buttons/BaseButton';
import TabBar from 'components/tabBar/TabBar';
import { tabMap } from 'components/tabBar/tabData';
import type { RentalFormSchemaType } from 'schemas/rentalFormSchema';
import { rentalFormSchema } from 'schemas/rentalFormSchema';

const RentalForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  gap: 2.4rem;
  padding: 2.4rem;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const OpenBusRental = () => {
  const [activeTab, setActiveTab] = useState(0);

  const methods = useForm<RentalFormSchemaType>({
    resolver: zodResolver(rentalFormSchema),
    defaultValues: {
      imageUrl: null,
      title: '',
      region: '',
      depositAccount: '',
      concertId: 0,
    },
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    formState: { isValid },
    watch,
  } = methods;

  const formData = watch();

  // 추후 삭제
  useEffect(() => {
    console.log('formData changed:', formData);
  }, [formData]);

  const handleFormSubmit = handleSubmit((formData) => {
    if (activeTab < tabMap.rentalTab.length - 1) {
      setActiveTab(activeTab + 1);
    } else {
      console.log('submit', formData); // 추후 삭제
    }
  });

  const handlePrevClick = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  return (
    <>
      <TabBar isInactive selectedTab={tabMap.rentalTab[activeTab]} tabList={tabMap.rentalTab} />
      <FormProvider {...methods}>
        <RentalForm onSubmit={handleFormSubmit}>
          <FormContent>
            {activeTab === 0 && <DetailFormInfo />}
            {activeTab === 1 && <DrivingFormInfo />}
            {activeTab === 2 && <AdditionalFormInfo />}
          </FormContent>
          <ButtonWrapper>
            {activeTab > 0 && (
              <BaseButton
                color="dark"
                onClick={handlePrevClick}
                size="medium"
                type="button"
                variant="outline"
              >
                이전
              </BaseButton>
            )}
            <BaseButton
              color="primary"
              isDisabled={!isValid}
              size="medium"
              type="submit"
              variant="fill"
            >
              다음
            </BaseButton>
          </ButtonWrapper>
        </RentalForm>
      </FormProvider>
    </>
  );
};

export default OpenBusRental;
