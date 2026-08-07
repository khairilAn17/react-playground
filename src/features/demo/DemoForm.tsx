import { useForm, FormProvider } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Alert,
  Chip,
} from '@mui/material'
import { useState } from 'react'
import {
  FormTextField,
  FormSelect,
  FormAutocomplete,
  FormRadioGroup,
  FormSwitch,
  FormCheckbox,
  FormSlider,
} from '../../components/form'
import type { SelectOption, RadioOption, AutocompleteOption } from '../../components/form'
import { demoSchema } from './demoSchema'
import type { DemoFormValues } from './demoSchema'

const ROLE_OPTIONS: SelectOption[] = [
  { label: 'Frontend Developer', value: 'frontend_developer' },
  { label: 'Backend Developer', value: 'backend_developer' },
  { label: 'Full Stack Developer', value: 'fullstack_developer' },
  { label: 'UI/UX Designer', value: 'designer' },
  { label: 'Product Manager', value: 'product_manager' },
  { label: 'QA Engineer', value: 'qa_engineer' },
  { label: 'DevOps Engineer', value: 'devops_engineer' },
  { label: 'Data Scientist', value: 'data_scientist' },
]

const FRAMEWORK_OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'SolidJS', value: 'solid' },
]

const PLAN_OPTIONS: RadioOption[] = [
  { label: 'Free Plan ($0/mo)', value: 'free' },
  { label: 'Pro Plan ($19/mo)', value: 'pro' },
  { label: 'Enterprise Plan (Custom)', value: 'enterprise' },
]

export function DemoForm() {
  const [submittedData, setSubmittedData] = useState<DemoFormValues | null>(null)

  const methods = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: '',
      framework: '',
      experienceYears: 3,
      plan: 'free',
      subscribeNewsletter: false,
      agreeTerms: false,
      bio: '',
    },
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = methods

  const onSubmit: SubmitHandler<DemoFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedData(data)
  }

  const handleReset = () => {
    reset()
    setSubmittedData(null)
  }

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', py: 4, px: 2 }}>
      {/* Header */}
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          RHF + MUI Form Component Kit
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type-safe fields: Text, Select, Autocomplete, Slider, Radio, Switch & Checkbox.
        </Typography>
      </Stack>

      {/* Form card */}
      <Card variant="outlined">
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
                {/* 1. FormTextField */}
                <FormTextField<DemoFormValues>
                  name="fullName"
                  label="Full Name"
                  placeholder="John Doe"
                />

                {/* 2. Email FormTextField */}
                <FormTextField<DemoFormValues>
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                />

                {/* 3. Password FormTextField */}
                <FormTextField<DemoFormValues>
                  name="password"
                  label="Password"
                  type="password"
                  helperText="Min 8 chars, 1 uppercase, 1 number"
                />

                {/* 4. FormSelect */}
                <FormSelect<DemoFormValues>
                  name="role"
                  label="Role"
                  options={ROLE_OPTIONS}
                  searchable
                  searchPlaceholder="Filter roles..."
                />

                {/* 5. FormAutocomplete */}
                <FormAutocomplete<DemoFormValues>
                  name="framework"
                  label="Primary Tech Framework"
                  options={FRAMEWORK_OPTIONS}
                />

                {/* 6. FormSlider */}
                <FormSlider<DemoFormValues>
                  name="experienceYears"
                  label="Years of Experience"
                  min={0}
                  max={20}
                  step={1}
                  valueLabelDisplay="auto"
                  formatValue={(val) => `${val} year${val === 1 ? '' : 's'}`}
                />

                {/* 7. FormRadioGroup */}
                <FormRadioGroup<DemoFormValues>
                  name="plan"
                  label="Subscription Plan"
                  options={PLAN_OPTIONS}
                />

                {/* 8. Multiline FormTextField */}
                <FormTextField<DemoFormValues>
                  name="bio"
                  label="Bio (optional)"
                  multiline
                  rows={3}
                  placeholder="Tell us about yourself..."
                />

                <Divider />

                {/* 9. FormSwitch */}
                <FormSwitch<DemoFormValues>
                  name="subscribeNewsletter"
                  label="Subscribe to weekly developer updates"
                />

                {/* 10. FormCheckbox */}
                <FormCheckbox<DemoFormValues>
                  name="agreeTerms"
                  label="I agree to the Terms of Service and Privacy Policy"
                />

                <Divider />

                <Stack direction="row" spacing={1.5}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {/* Success output */}
      {isSubmitSuccessful && submittedData && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Form submitted successfully!
          </Alert>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Submitted Values
              </Typography>
              <Stack spacing={1}>
                {Object.entries(submittedData).map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={key} size="small" variant="outlined" />
                    <Typography variant="body2" color="text.secondary">
                      {String(value) || '—'}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Live error summary */}
      {Object.keys(errors).length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="warning">
            {Object.keys(errors).length} validation error
            {Object.keys(errors).length > 1 ? 's' : ''} — check the fields above.
          </Alert>
        </Box>
      )}
    </Box>
  )
}
