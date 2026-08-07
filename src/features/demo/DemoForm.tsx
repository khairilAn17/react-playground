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
import { FormTextField, FormSelect } from '../../components/form'
import type { SelectOption } from '../../components/form'
import { demoSchema } from '../../features/demo/demoSchema'
import type { DemoFormValues } from '../../features/demo/demoSchema'

const ROLE_OPTIONS: SelectOption[] = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'product_manager' },
  { label: 'QA Engineer', value: 'qa_engineer' },
]

/**
 * DemoForm
 *
 * Showcases FormTextField and FormSelect in two modes:
 *   1. Inside <FormProvider> — recommended for app-level forms
 *   2. With explicit `control` prop — for standalone / library usage
 */
export function DemoForm() {
  const [submittedData, setSubmittedData] = useState<DemoFormValues | null>(null)

  const methods = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: '',
      bio: '',
    },
    // Validate on blur for better UX — fields only show errors after user leaves them
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = methods

  const onSubmit: SubmitHandler<DemoFormValues> = async (data) => {
    // Simulate async submission (e.g. API call)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedData(data)
  }

  const handleReset = () => {
    reset()
    setSubmittedData(null)
  }

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', py: 4, px: 2 }}>
      {/* Header */}
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          RHF + MUI Form Demo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hybrid pattern with <code>FormTextField</code> and <code>FormSelect</code>.
        </Typography>
      </Stack>

      {/* Form card */}
      <Card variant="outlined">
        <CardContent>
          {/* FormProvider wraps the form — children access control via useFormContext */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>

                {/* Standard text field */}
                <FormTextField<DemoFormValues>
                  name="fullName"
                  label="Full Name"
                  placeholder="John Doe"
                />

                {/* Email field — type="email" enables browser semantics */}
                <FormTextField<DemoFormValues>
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                />

                {/* Password field */}
                <FormTextField<DemoFormValues>
                  name="password"
                  label="Password"
                  type="password"
                  helperText="Min 8 chars, 1 uppercase, 1 number"
                />

                {/* Select field */}
                <FormSelect<DemoFormValues>
                  name="role"
                  label="Role"
                  options={ROLE_OPTIONS}
                />

                {/* Multiline textarea — same component, different MUI props */}
                <FormTextField<DemoFormValues>
                  name="bio"
                  label="Bio (optional)"
                  multiline
                  rows={3}
                  placeholder="Tell us about yourself..."
                  helperText="Max 200 characters"
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

      {/* Live error summary (dev aid) */}
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

