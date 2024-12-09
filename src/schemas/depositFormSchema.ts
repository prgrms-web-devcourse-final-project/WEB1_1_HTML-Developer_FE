import { z } from 'zod';

const requiredString = () => z.string().min(1, '필수 입력 항목입니다.');

const requiredRadio = () =>
  z
    .string()
    .nullable()
    .optional()
    .refine((val) => val !== null && val !== undefined, {
      message: '필수 입력 항목입니다.',
    });

export const depositFormSchema = z.object({
  depositorName: requiredString(),
  depositorTime: requiredString(),
  phone: requiredString().regex(/^\d{3}-\d{3,4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다.'),
  passengerNum: z.number().min(1, '최소 1명 이상이어야 합니다.'),
  boardingDate: requiredString(),
  boardingType: requiredRadio(),
  refundType: requiredRadio(),
  refundAccount: requiredString().optional(), // 추후 수정
});

export type DepositFormSchemaType = z.infer<typeof depositFormSchema>;
