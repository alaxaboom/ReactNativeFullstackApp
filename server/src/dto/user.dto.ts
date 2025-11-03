import { z } from 'zod';

export const PhoneUpdateDto = z.object({
  phone: z.string()
    .min(1, 'Phone is required')
    .regex(/^\d+$/, 'Phone must contain only digits')
    .length(11, 'Phone must be exactly 11 digits'),
});

export type PhoneUpdateDtoType = z.infer<typeof PhoneUpdateDto>;