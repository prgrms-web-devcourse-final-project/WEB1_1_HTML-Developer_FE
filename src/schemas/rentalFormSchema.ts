import { z } from 'zod';

export const rentalFormSchema = z.object({});

export type RentalFormSchemaType = z.infer<typeof rentalFormSchema>;
