import styled from '@emotion/styled';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import type { DepositFormSchemaType } from 'schemas';
import { useModalStore } from 'stores';
import { TitleText2 } from 'styles/Typography';

interface DepositDialogProps {
  formData: DepositFormSchemaType;
  onConfirm: (formData: DepositFormSchemaType) => void;
}

const DepositDialogContainer = styled.div`
  position: absolute;
  z-index: 1004;
`;

const DepositDialog = ({ formData, onConfirm }: DepositDialogProps) => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleApplyClick = () => {
    console.log('폼 제출', formData);
    onConfirm(formData);
    closeModal('dialog', 'confirm');
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
