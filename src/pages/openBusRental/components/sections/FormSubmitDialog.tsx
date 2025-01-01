import { useNavigate } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { usePostRentalForm } from 'queries/rentForm/usePostRentalForm';
import { rentalFormStore, useModalStore, useRentalFormStore } from 'stores';
import { TitleText2 } from 'styles/Typography';

const FormSubmitDialog = () => {
  const { closeModal } = useModalStore(['closeModal']);
  const { mutate } = usePostRentalForm();
  const { formData, resetFormData } = useRentalFormStore(['formData', 'resetFormData']);
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    resetFormData();
    rentalFormStore.persist.clearStorage();
    navigate('/bus-rental');
  };

  const handleSubmitClick = () => {
    mutate(formData, {
      onSuccess: handleSubmitSuccess,
    });
    closeModal('dialog', 'confirm');
  };

  return (
    <Dialog>
      <Dialog.Content>
        <TitleText2>차량 대절 폼을 등록하시겠습니까?</TitleText2>
      </Dialog.Content>
      <Dialog.Button>
        <BaseButton
          color="dark"
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
          onClick={handleSubmitClick}
          size="small"
          variant="fill"
        >
          등록
        </BaseButton>
      </Dialog.Button>
    </Dialog>
  );
};

export default FormSubmitDialog;
