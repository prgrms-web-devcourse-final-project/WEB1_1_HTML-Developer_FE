import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { usePostDepositForm } from 'queries/rent';
import { useModalStore } from 'stores';
import { TitleText2 } from 'styles/Typography';
import type { DepositFormData } from 'types';

interface DepositDialogProps {
  formData: DepositFormData;
}

const DepositDialogContainer = styled.div`
  position: absolute;
  z-index: 1004;
`;

const DepositDialog = ({ formData }: DepositDialogProps) => {
  const { id } = useParams();
  const { mutate } = usePostDepositForm();
  const { closeModal } = useModalStore(['closeModal']);

  const handleSubmitSuccess = () => {
    closeModal('dialog', 'confirm');
    closeModal('bottomSheet', 'list');
  };

  const handleApplyClick = () => {
    if (id) mutate({ id, depositFormData: formData }, { onSuccess: handleSubmitSuccess });
  };

  return (
    <DepositDialogContainer>
      <Dialog>
        <Dialog.Content>
          <TitleText2>차량 대절을 신청하시겠습니까?</TitleText2>
        </Dialog.Content>
        <Dialog.Button>
          <BaseButton
            color="primary"
            isFullWidth={false}
            onClick={() => closeModal('dialog', 'confirm')}
            size="small"
            variant="outline"
          >
            취소
          </BaseButton>
          <BaseButton
            color="primary"
            isFullWidth={false}
            onClick={handleApplyClick}
            size="small"
            variant="fill"
          >
            신청
          </BaseButton>
        </Dialog.Button>
      </Dialog>
    </DepositDialogContainer>
  );
};

export default DepositDialog;
