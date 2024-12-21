import { z } from 'zod';

const requiredString = () => z.string().min(1, '필수 입력 항목입니다.');
const requiredNumber = () => z.number().positive('필수 입력 항목입니다.');
const requiredImage = () =>
  z
    .string()
    .nullable()
    .refine((value) => value !== null && value.length > 0, '파일을 업로드해야 합니다.');

export const rentalFormSchema = [
  z.object({
    imageUrl: requiredImage(),
    title: requiredString(),
    concertId: requiredNumber(),
    artistName: requiredString(),
    region: requiredString(),
    depositAccount: requiredString(),
  }),
];

export type RentalFormSchemaType = z.infer<(typeof rentalFormSchema)[number]>;
