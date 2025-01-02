import { z } from 'zod';

export const depoistForminitValues: DepositFormSchemaType = {
  depositorName: '',
  depositorTime: '',
  phone: '',
  passengerNum: 1,
  boardingDate: '',
  refundType: null,
  boardingType: null,
  refundAccount: '',
};

const requiredString = () => z.string().min(1, '필수 입력 항목입니다.');
const nullableToValidString = () =>
  z
    .string()
    .nullable()
    .refine((value) => value !== null && value.trim() !== '', {
      message: '필수 입력 항목입니다.',
    });

export const depositFormSchema = z
  .object({
    depositorName: requiredString(),
    depositorTime: requiredString(),
    phone: requiredString().regex(/^\d{3}-\d{3,4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다.'),
    passengerNum: z.number().min(1, '최소 1명 이상이어야 합니다.'),
    boardingDate: requiredString(),
    boardingType: nullableToValidString(),
    refundType: nullableToValidString(),
    refundAccount: z.string(),
  })
  .refine(
    (data) => {
      return data.refundType === '환불' && !data.refundAccount ? false : true;
    },
    {
      message: '환불 계좌는 필수 입력 항목입니다.',
      path: ['refundAccount'],
    }
  );

export type DepositFormSchemaType = z.infer<typeof depositFormSchema>;
