import { z } from 'zod';

export const LoginSchema = z.object({
  phone: z.string().min(10, 'Invalid SA phone number'),
});

export const UserRegistrationSchema = z.object({
  phone: z.string().min(10, 'Invalid SA phone number'),
  name: z.string().min(2, 'Name is too short'),
});

export const SupportTicketSchema = z.object({
  userId: z.string().uuid(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export const ResponderRegistrationSchema = z.object({
  phone: z.string().min(10, 'Invalid SA phone number'),
  name: z.string().min(2, 'Name is too short'),
  psiraNumber: z.string().min(5, 'Valid PSIRA number is required'),
});
