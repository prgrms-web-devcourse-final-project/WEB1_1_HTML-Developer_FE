import { z } from 'zod';

export const refundAccountSchema = z.object({
  bank: z
    .string()
    .min(1, { message: '은행명을 입력해주세요' })
    .regex(/^[가-힣A-Za-z\s]+$/, {
      message: '올바른 은행명을 입력해주세요',
    }),
  accountNumber: z
    .string()
    .min(1, { message: '계좌번호를 입력해주세요' })
    .regex(/^[0-9-]+$/, {
      message: '올바른 계좌번호 형식을 입력해주세요',
    }),
});

export type RefundAccountSchemaType = z.infer<typeof refundAccountSchema>;
