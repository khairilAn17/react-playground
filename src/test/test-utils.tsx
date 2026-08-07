import type { ReactNode } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { FieldValues, UseFormProps } from 'react-hook-form'

export interface TestFormWrapperProps<T extends FieldValues> {
  children: ReactNode
  defaultValues?: UseFormProps<T>['defaultValues']
  useFormProps?: Omit<UseFormProps<T>, 'defaultValues'>
}

/**
 * TestFormWrapper
 *
 * Helper wrapper component for testing and Storybook.
 * Initializes React Hook Form and wraps children in <FormProvider>.
 */
export function TestFormWrapper<T extends FieldValues>({
  children,
  defaultValues,
  useFormProps,
}: TestFormWrapperProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    ...useFormProps,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
