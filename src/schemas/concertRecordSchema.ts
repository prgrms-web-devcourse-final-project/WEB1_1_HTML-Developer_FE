import { z } from 'zod';

const requiredString = () => z.string().min(1, '필수 입력 항목입니다.');
const requiredNumber = () => z.number().positive('필수 입력 항목입니다.');
const requiredFiles = () =>
  z
    .array(
      z.instanceof(File).refine((file) => file instanceof File, {
        message: '파일을 업로드해야 합니다.',
      })
    )
    .optional()
    .default([]);

export const concertRecordSchema = z.object({
  concertId: requiredNumber(),
  date: requiredString(),
  episode: requiredString(),
  content: requiredString(),
  seatName: requiredString(),
  images: requiredFiles(),
});

export type ConcertRecordSchemaType = z.infer<typeof concertRecordSchema>;
