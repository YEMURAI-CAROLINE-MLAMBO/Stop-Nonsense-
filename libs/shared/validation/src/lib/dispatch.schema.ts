import { z } from 'zod';

export const PanicTriggerSchema = z.object({
  userId: z.string().uuid(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  address: z.string().min(5),
});

export const CoordinateAccessSchema = z.object({
  incidentId: z.string().min(1),
  address: z.string().min(5),
  contactType: z.string().min(2),
});

export const LocationUpdateSchema = z.object({
  responderId: z.string().uuid(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});
