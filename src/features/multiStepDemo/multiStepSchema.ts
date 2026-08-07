import { z } from 'zod'

export const personalStepSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

export const professionalStepSchema = z.object({
  role: z.string().min(1, 'Please select a job role'),
  framework: z.string().min(1, 'Please select a framework'),
  experienceYears: z.number().min(0).max(30),
})

export const subscriptionStepSchema = z.object({
  plan: z.enum(['free', 'pro', 'enterprise']),
  subscribeNewsletter: z.boolean(),
  agreeTerms: z.literal(true, {
    message: 'You must accept the terms to proceed',
  }),
})

export const multiStepSchema = z.object({
  personal: personalStepSchema,
  professional: professionalStepSchema,
  subscription: subscriptionStepSchema,
})

export type MultiStepFormValues = z.infer<typeof multiStepSchema>

export const STEP_FIELDS: Array<Array<keyof MultiStepFormValues>> = [
  ['personal'],
  ['professional'],
  ['subscription'],
]
