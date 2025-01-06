import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { useDeleteConcertRecord } from 'queries/concertRecord/useDeleteConcertRecord';
import { useModalStore } from 'stores';
import { useConcertRecordStore } from 'stores/concertRecordStore';
import { TitleText2 } from 'styles/Typography';

const RecordDeleteDialog = () => {
  const { closeModal } = useModalStore(['closeModal']);
  const { recordData, resetRecordData } = useConcertRecordStore(['recordData', 'resetRecordData']);
  const { mutate } = useDeleteConcertRecord();

  const handleSubmitSuccess = () => {
    resetRecordData();
    closeModal('dialog', 'confirm');
  };

  const handleDeleteClick = () => {
    if (recordData.id && recordData.date) {
      mutate({ id: recordData.id, date: recordData.date }, { onSuccess: handleSubmitSuccess });
    }
  };

  return (
    <Dialog>
      <Dialog.Content>
        <TitleText2>해당 공연 기록을 삭제하시겠습니까?</TitleText2>
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
          onClick={handleDeleteClick}
          size="small"
          variant="fill"
        >
          삭제
        </BaseButton>
      </Dialog.Button>
    </Dialog>
  );
};

export default RecordDeleteDialog;
