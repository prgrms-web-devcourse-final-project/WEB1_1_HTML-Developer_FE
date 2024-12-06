import { endPoint } from 'constants/endPoint';
import type { RefundAccountRequest, RefundAccount } from 'types';
import { tokenAxios } from 'utils';

const createRefundAccount = async (formData: RefundAccountRequest): Promise<RefundAccount> => {
  const { data } = await tokenAxios.post(endPoint.CREATE_REFUND_ACCOUNT, formData);
  return data;
};

const updateRefundAccount = async (formData: RefundAccount): Promise<RefundAccount> => {
  const { data } = await tokenAxios.put(endPoint.UPDATE_REFUND_ACCOUNT, formData);
  return data;
};

const deleteRefundAccount = async (): Promise<void> => {
  await tokenAxios.delete(endPoint.DELETE_REFUND_ACCOUNT);
};

export { createRefundAccount, updateRefundAccount, deleteRefundAccount };
