import { z } from 'zod';

export const OnboardingSchema = z.object({
  phone: z.string().min(10, 'Invalid SA phone number'),
  name: z.string().min(2, 'Name is too short'),
  address: z.string().min(5, 'Address is required'),
  accessMethod: z.enum(['REMOTE_OPEN', 'GUARD_ON_DUTY', 'OPEN_STREET', 'INTERCOM']),
  accessContacts: z.array(z.string()).min(1, 'At least one contact is required'),
  popiaConsent: z.boolean().refine(v => v === true, 'Consent is required'),
});

export type OnboardingData = z.infer<typeof OnboardingSchema>;
