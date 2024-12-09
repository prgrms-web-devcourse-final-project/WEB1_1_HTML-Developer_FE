import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { LuAlertCircle } from 'react-icons/lu';

import BoardingDateRadio from './BoardingDateRadio';
import BoardingTypeRadio from './BoardingTypeRadio';
import DepositDialog from './DepositDialog';
import RefundTypeRadio from './RefundTypeRadio';
import RentalInputField from './RentalInputField';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import BaseButton from 'components/buttons/BaseButton';
import Counter from 'components/counter/Counter';
import { depositFormSchema, type DepositFormSchemaType } from 'schemas';
import { useModalStore } from 'stores';
import { BodyMediumText, BodyRegularText } from 'styles/Typography';
import type { RefundType } from 'types';

interface DepositFormSheetProps {
  boardingDates: string[];
  refundType: RefundType;
}

const AlertMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
  color: ${({ theme }) => theme.colors.red};
`;

const DepositForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: relative;
  padding-bottom: 6.4rem;
`;

const InputContainer = styled.div<{ isHorizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ isHorizontal = false }) => (isHorizontal ? 'row' : 'column')};
  justify-content: ${({ isHorizontal = false }) => (isHorizontal ? 'space-between' : 'auto')};
  align-items: ${({ isHorizontal = false }) => (isHorizontal ? 'center' : 'auto')};
  gap: 1.2rem;
`;

const InputLabel = styled(BodyMediumText)`
  color: ${({ theme }) => theme.colors.white};
`;

const InputDescription = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const Asterisk = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.6rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const depositFormInitValues = {
  depositorName: '',
  depositorTime: '',
  phone: '',
  passengerNum: 1,
  boardingDate: '',
  boardingType: undefined,
  refundType: undefined,
  refundAccount: '',
};

const DepositFormSheet = ({ boardingDates, refundType }: DepositFormSheetProps) => {
  const { openModal } = useModalStore(['openModal']);

  const methods = useForm<DepositFormSchemaType>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: depositFormInitValues,
    mode: 'onSubmit',
  });

  const { watch, control, handleSubmit, reset } = methods;
  const refundTypeValue = watch('refundType');

  const handleSubmitFormData = (formData: DepositFormSchemaType) => {
    // 로직 수정
    console.log('서버로 폼 제출:', formData);
    reset(depositFormInitValues);
  };

  const handleFormSubmit = handleSubmit((formData) => {
    // console.log('submit', formData);
    openModal(
      'dialog',
      'confirm',
      <DepositDialog formData={formData} onConfirm={handleSubmitFormData} />
    );
  });

  const InputTitle = ({
    isRequired = true,
    children,
  }: {
    isRequired?: boolean;
    children: React.ReactNode;
  }) => {
    return (
      <InputLabel>
        {children}
        {isRequired && <Asterisk>*</Asterisk>}
      </InputLabel>
    );
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Content>
        <AlertMessage>
          <LuAlertCircle size={20} />
          <BodyRegularText>입금 후에 폼을 작성해주세요!</BodyRegularText>
        </AlertMessage>
        <FormProvider {...methods}>
          <DepositForm onSubmit={handleFormSubmit}>
            <InputContainer>
              <InputTitle>입금자명</InputTitle>
              <RentalInputField name="depositorName" />
            </InputContainer>
            <InputContainer>
              <InputTitle>입금시각</InputTitle>
              <RentalInputField name="depositorTime" />
            </InputContainer>
            <InputContainer>
              <InputTitle>전화번호</InputTitle>
              <RentalInputField name="phone" pattern="###-####-####" />
            </InputContainer>
            <InputContainer isHorizontal>
              <InputTitle>탑승 인원(본인 포함)</InputTitle>
              <Controller
                control={control}
                name="passengerNum"
                render={({ field }) => (
                  <Counter
                    {...field}
                    maxCount={10}
                    minCount={1}
                    onChange={(value) => field.onChange(value)}
                    value={Number(field.value) || 1}
                  />
                )}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>이용 날짜</InputTitle>
              <BoardingDateRadio boardingDates={boardingDates} />
            </InputContainer>
            <InputContainer>
              <InputTitle>이용 편도</InputTitle>
              <BoardingTypeRadio />
            </InputContainer>
            <InputContainer>
              <InputTitle>인원 미달 시 희망 옵션</InputTitle>
              <RefundTypeRadio refundOption={refundType} />
              {refundTypeValue === '환불' && (
                <>
                  <InputDescription>환불 계좌 입력</InputDescription>
                  <RentalInputField name="refundAccount" />
                </>
              )}
            </InputContainer>
            <BottomButtonWrapper>
              <BaseButton color="primary" size="medium" type="submit" variant="fill">
                제출
              </BaseButton>
            </BottomButtonWrapper>
          </DepositForm>
        </FormProvider>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default DepositFormSheet;
