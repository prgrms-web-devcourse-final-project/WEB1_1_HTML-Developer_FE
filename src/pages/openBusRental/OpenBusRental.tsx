import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AdditionalFormInfo from './components/sections/AdditionalFormInfo';
import DetailFormInfo from './components/sections/DetailFormInfo';
import DrivingFormInfo from './components/sections/DrivingFormInfo';
import FormSubmitDialog from './components/sections/FormSubmitDialog';

import BaseButton from 'components/buttons/BaseButton';
import TabBar from 'components/tabBar/TabBar';
import { tabMap } from 'components/tabBar/tabData';
import type { RentalFormSchemaType } from 'schemas';
import { rentalFormSchema } from 'schemas';
import { useModalStore, useRentalFormStore } from 'stores';
import { getDefaultValues, validateForm } from 'utils';

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
  const { formData } = useRentalFormStore(['formData']);
  const { openModal } = useModalStore(['openModal']);
  const [activeTab, setActiveTab] = useState(0);

  const defaultValues = useMemo(() => getDefaultValues(formData, activeTab), [formData, activeTab]);
  const isFormValid = useMemo(() => validateForm(formData, activeTab), [formData, activeTab]);
  const schema = rentalFormSchema[activeTab];

  const methods = useForm<RentalFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { reset } = methods;

  useEffect(() => {
    if (schema && defaultValues) reset(defaultValues);
  }, [schema, defaultValues, reset]);

  const handlePrevClick = () => {
    if (activeTab > 0) setActiveTab((prevTab) => prevTab - 1);
  };

  const handleNextClick = () => {
    if (activeTab === tabMap.rentalTab.length - 1) {
      openModal('dialog', 'confirm', <FormSubmitDialog />);
    } else setActiveTab((prevTab) => prevTab + 1);
  };

  return (
    <>
      <TabBar isInactive selectedTab={tabMap.rentalTab[activeTab]} tabList={tabMap.rentalTab} />
      <FormProvider {...methods}>
        <RentalForm>
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
              isDisabled={!isFormValid}
              onClick={handleNextClick}
              size="medium"
              type="button"
              variant="fill"
            >
              {activeTab === tabMap.rentalTab.length - 1 ? '제출' : '다음'}
            </BaseButton>
          </ButtonWrapper>
        </RentalForm>
      </FormProvider>
    </>
  );
};

export default OpenBusRental;
