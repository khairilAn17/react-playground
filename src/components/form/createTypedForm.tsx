import type { ReactNode } from 'react'
import { useForm, FormProvider, useFormContext as useRHFFormContext, useWatch as useRHFWatch } from 'react-hook-form'
import type { FieldValues, UseFormProps, SubmitHandler, UseWatchProps, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormTextField, type FormTextFieldProps } from './FormTextField'
import { FormSelect, type FormSelectProps } from './FormSelect'
import { FormAutocomplete, type FormAutocompleteProps } from './FormAutocomplete'
import { FormCheckbox, type FormCheckboxProps } from './FormCheckbox'
import { FormRadioGroup, type FormRadioGroupProps } from './FormRadioGroup'
import { FormSlider, type FormSliderProps } from './FormSlider'
import { FormSwitch, type FormSwitchProps } from './FormSwitch'

type ZodResolverSchema = Parameters<typeof zodResolver>[0]

export interface TypedFormProps<T extends FieldValues> {
  children: ReactNode
  schema: ZodResolverSchema
  defaultValues: UseFormProps<T>['defaultValues']
  onSubmit: SubmitHandler<T>
  mode?: UseFormProps<T>['mode']
  noValidate?: boolean
  useFormOptions?: Omit<UseFormProps<T>, 'resolver' | 'defaultValues' | 'mode'>
}

/**
 * createTypedForm
 *
 * Gold-standard factory pattern for React Hook Form + MUI.
 *
 * Creates static, type-safe Form and Field components bound to generic schema type `T`.
 * Because this factory is invoked at module level, component identities remain 100% static across re-renders.
 *
 * @example
 * ```tsx
 * // 1. Create typed form controls at module level (outside render function):
 * export const { Form, Field, useFormContext } = createTypedForm<UserFormValues>()
 *
 * // 2. Clean call site inside component:
 * export function UserForm() {
 *   return (
 *     <Form schema={userSchema} defaultValues={defaults} onSubmit={handleSave}>
 *       <Field.Text name="name" label="Full Name" />
 *       <Field.Select name="role" label="Role" options={ROLES} />
 *     </Form>
 *   )
 * }
 * ```
 */
export function createTypedForm<T extends FieldValues>() {
  function Form({
    children,
    schema,
    defaultValues,
    onSubmit,
    mode = 'onBlur',
    noValidate = true,
    useFormOptions,
  }: TypedFormProps<T>) {
    const methods = useForm<T>({
      resolver: zodResolver(schema) as unknown as Resolver<T>,
      defaultValues,
      mode,
      ...useFormOptions,
    })

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data as T))} noValidate={noValidate}>
          {children}
        </form>
      </FormProvider>
    )
  }

  const Field = {
    Text: (props: Omit<FormTextFieldProps<T>, 'control'>) => (
      <FormTextField<T> {...props} />
    ),
    Select: (props: Omit<FormSelectProps<T>, 'control'>) => (
      <FormSelect<T> {...props} />
    ),
    Autocomplete: (props: Omit<FormAutocompleteProps<T>, 'control'>) => (
      <FormAutocomplete<T> {...props} />
    ),
    Checkbox: (props: Omit<FormCheckboxProps<T>, 'control'>) => (
      <FormCheckbox<T> {...props} />
    ),
    Radio: (props: Omit<FormRadioGroupProps<T>, 'control'>) => (
      <FormRadioGroup<T> {...props} />
    ),
    Slider: (props: Omit<FormSliderProps<T>, 'control'>) => (
      <FormSlider<T> {...props} />
    ),
    Switch: (props: Omit<FormSwitchProps<T>, 'control'>) => (
      <FormSwitch<T> {...props} />
    ),
  }

  function useFormContext() {
    return useRHFFormContext<T>()
  }

  function useWatch(props?: UseWatchProps<T>) {
    return useRHFWatch<T>(props as any)
  }

  return {
    Form,
    Field,
    useFormContext,
    useWatch,
  }
}
