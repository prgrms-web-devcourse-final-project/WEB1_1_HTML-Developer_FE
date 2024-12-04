import { endPoint } from 'constants/endPoint';
import { tokenAxios } from 'utils';

const createRefundAccount = async () => {
  const response = await tokenAxios.post(endPoint.CREATE_REFUND_ACCOUNT);
  return response;
};

const deleteRefundAccount = async () => {
  const response = await tokenAxios.delete(endPoint.DELETE_REFUND_ACCOUNT);
  return response;
};

export { createRefundAccount, deleteRefundAccount };
