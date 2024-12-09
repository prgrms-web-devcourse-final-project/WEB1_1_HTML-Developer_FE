import type { DepositFormValues } from 'stores';

type DepositFormPlaceholder = Partial<Record<keyof DepositFormValues, string>>;

export const DEPOSIT_FORM_PLACEHOLDER: DepositFormPlaceholder = {
  depositorName: `성함을 입력해주세요.`,
  depositorTime: `예시) 23:02`,
  phone: `010-1234-5678`,
  refundAccount: `예시) 하나은행 012345678910111`,
};
