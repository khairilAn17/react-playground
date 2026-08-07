import { z } from 'zod'

/**
 * Demo schema to showcase all form field components and validations.
 */
export const demoSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(3, 'Must be at least 3 characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),

  birthDate: z.any().nullable().optional(),

  role: z.string().min(1, 'Please select a role'),

  framework: z.string().min(1, 'Please select a framework'),

  experienceYears: z
    .number()
    .min(1, 'At least 1 year of experience is required')
    .max(20),

  plan: z.enum(['free', 'pro', 'enterprise']),

  subscribeNewsletter: z.boolean(),

  agreeTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the Terms & Conditions'),

  bio: z.string().max(200, 'Bio must be 200 characters or fewer').optional(),
})

export type DemoFormValues = z.infer<typeof demoSchema>
