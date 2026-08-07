import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import type { FieldValues, UseFormProps, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type ZodResolverSchema = Parameters<typeof zodResolver>[0]

export interface TestFormWrapperProps<T extends FieldValues> {
  children: ReactNode
  schema?: ZodResolverSchema
  defaultValues?: UseFormProps<T>['defaultValues']
  useFormProps?: Omit<UseFormProps<T>, 'defaultValues' | 'resolver'>
}

/**
 * TestFormWrapper
 *
 * Helper wrapper for unit tests and Storybook.
 * Wraps children with React Hook Form FormProvider and MUI LocalizationProvider.
 * Accepts an optional Zod schema for resolver-backed validation.
 */
export function TestFormWrapper<T extends FieldValues>({
  children,
  schema,
  defaultValues,
  useFormProps,
}: TestFormWrapperProps<T>) {
  const methods = useForm<T>({
    resolver: schema ? (zodResolver(schema) as unknown as Resolver<T>) : undefined,
    defaultValues,
    ...useFormProps,
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...methods}>{children}</FormProvider>
    </LocalizationProvider>
  )
}

/**
 * renderWithForm
 *
 * Convenience wrapper around @testing-library/react render
 * that automatically sets up FormProvider + LocalizationProvider.
 */
export function renderWithForm<T extends FieldValues>(
  ui: ReactNode,
  options?: Omit<TestFormWrapperProps<T>, 'children'>
) {
  return render(
    <TestFormWrapper<T> {...options}>
      {ui}
    </TestFormWrapper>
  )
}
