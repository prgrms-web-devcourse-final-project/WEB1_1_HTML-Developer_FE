import { initDetailInfo, initDrivingInfo, initAdditionalInfo } from 'stores';
import type { FormAdditionalInfo, FormDetailInfo, FormDrivingInfo, RentalFormData } from 'types';

const keysMap = [
  Object.keys(initDetailInfo) as (keyof FormDetailInfo)[],
  Object.keys(initDrivingInfo) as (keyof FormDrivingInfo)[],
  Object.keys(initAdditionalInfo) as (keyof FormAdditionalInfo)[],
];

export const getDefaultValues = (formData: RentalFormData, activeTab: number) => {
  if (activeTab >= 0 && activeTab < keysMap.length) {
    return Object.fromEntries(keysMap[activeTab].map((key) => [key, formData[key]]));
  }
  return {};
};

export const validateForm = (formData: RentalFormData, activeTab: number) => {
  const isInfoValid = (keys: (keyof RentalFormData)[]) =>
    keys.every((key) => Boolean(formData[key]));

  return isInfoValid(keysMap[activeTab]);
};
