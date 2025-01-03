import { endPoint } from 'constants/endPoint';
import type { RefundAccountForm } from 'types';
import { tokenAxios } from 'utils';

const createRefundAccount = async (formData: RefundAccountForm) => {
  const { data } = await tokenAxios.post(endPoint.CREATE_REFUND_ACCOUNT, formData);
  return data;
};

const updateRefundAccount = async (formData: RefundAccountForm) => {
  const { data } = await tokenAxios.put(endPoint.UPDATE_REFUND_ACCOUNT, formData);
  return data;
};

const deleteRefundAccount = async (): Promise<void> => {
  await tokenAxios.delete(endPoint.DELETE_REFUND_ACCOUNT);
};

export { createRefundAccount, updateRefundAccount, deleteRefundAccount };
