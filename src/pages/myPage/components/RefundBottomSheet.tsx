import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import BaseButton from 'components/buttons/BaseButton';
import type { RefundAccountSchemaType } from 'schemas';
import { refundAccountSchema } from 'schemas';
import { MediumButtonText } from 'styles/Typography';
import type { RefundAccountInfo } from 'types';

interface RefundBottomSheetProps {
  accountInfo?: RefundAccountInfo;
}

const RefundBottomSheet = ({ accountInfo }: RefundBottomSheetProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RefundAccountSchemaType>({
    resolver: zodResolver(refundAccountSchema),
    defaultValues: {
      bank: accountInfo?.bank || '',
      accountNumber: accountInfo?.accountNumber || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: RefundAccountSchemaType) => {
    try {
      // TODO: API
      console.log('Submitting:', data);
    } catch (err) {
      console.error('Failed to save account info:', err);
    }
  };

  return (
    <BottomSheet name="refundAccount">
      <BottomSheet.Content>
        <Form>
          <InputContainer>
            <Label>은행</Label>
            <Input {...register('bank')} placeholder="은행을 입력해주세요" />
            <AnimatePresence mode="wait">
              {errors.bank && (
                <ErrorMessage
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  {errors.bank.message}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </InputContainer>

          <InputContainer>
            <Label>계좌번호</Label>
            <Input {...register('accountNumber')} placeholder="계좌번호를 입력해주세요" />
            <AnimatePresence mode="wait">
              {errors.accountNumber && (
                <ErrorMessage
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  {errors.accountNumber.message}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </InputContainer>
        </Form>
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <BaseButton
          color="primary"
          isDisabled={!isDirty || !isValid}
          onClick={handleSubmit(onSubmit)}
          size="medium"
          variant="fill"
        >
          <MediumButtonText>{accountInfo ? '수정하기' : '등록하기'}</MediumButtonText>
        </BaseButton>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 1.2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-height: 9.3rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const ErrorMessage = styled(motion.span)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.red};
`;

export default RefundBottomSheet;
