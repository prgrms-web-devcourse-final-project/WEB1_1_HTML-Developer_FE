import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { usePatchConcertRecord } from 'queries/concertRecord';
import { useConcertRecordStore, useModalStore } from 'stores';
import { TitleText2 } from 'styles/Typography';
import type { ConcertRecordForm } from 'types';

interface RecordUpdateDialogProps {
  recordData: ConcertRecordForm;
}

const DialogContainer = styled.div`
  position: absolute;
  z-index: 1004;
`;

const RecordUpdateDialog = ({ recordData }: RecordUpdateDialogProps) => {
  const { id } = useParams();
  const { closeModal } = useModalStore(['closeModal']);
  const { resetRecordData } = useConcertRecordStore(['resetRecordData']);
  const { mutate } = usePatchConcertRecord();
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    resetRecordData();
    navigate('/concert-record');
    closeModal('dialog', 'confirm');
  };

  const handleApplyClick = () => {
    if (id) {
      const diaryId = Number(id);
      mutate({ ...recordData, diaryId }, { onSuccess: handleSubmitSuccess });
    }
  };

  return (
    <DialogContainer>
      <Dialog>
        <Dialog.Content>
          <TitleText2>공연 기록을 수정하시겠습니까?</TitleText2>
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
            완료
          </BaseButton>
        </Dialog.Button>
      </Dialog>
    </DialogContainer>
  );
};

export default RecordUpdateDialog;
