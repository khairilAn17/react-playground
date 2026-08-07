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
import { createTypedForm } from '../../components/form'
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

// 🚀 GOLD STANDARD FACTORY PATTERN:
// Defined ONCE at module scope outside the render loop.
// Component references (Field.Text, Field.Select, Form) are 100% static across re-renders!
const { Form, Field } = createTypedForm<DemoFormValues>()

const DEFAULT_VALUES: DemoFormValues = {
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
}

export function DemoForm() {
  const [submittedData, setSubmittedData] = useState<DemoFormValues | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: DemoFormValues) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedData(data)
    setIsSubmitting(false)
  }

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', py: 4, px: 2 }}>
      {/* Header */}
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          RHF + MUI Form Component Kit
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gold Standard DX: <code>createTypedForm</code> static module factory pattern.
        </Typography>
      </Stack>

      {/* Form card */}
      <Card variant="outlined">
        <CardContent>
          <Form
            schema={demoSchema}
            defaultValues={DEFAULT_VALUES}
            onSubmit={handleSubmit}
          >
            <Stack spacing={2.5}>
              {/* 1. Field.Text */}
              <Field.Text
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
              />

              {/* 2. Email Field.Text */}
              <Field.Text
                name="email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
              />

              {/* 3. Password Field.Text */}
              <Field.Text
                name="password"
                label="Password"
                type="password"
                helperText="Min 8 chars, 1 uppercase, 1 number"
              />

              {/* 4. Field.Select */}
              <Field.Select
                name="role"
                label="Role"
                options={ROLE_OPTIONS}
                searchable
                searchPlaceholder="Filter roles..."
              />

              {/* 5. Field.Autocomplete */}
              <Field.Autocomplete
                name="framework"
                label="Primary Tech Framework"
                options={FRAMEWORK_OPTIONS}
              />

              {/* 6. Field.Slider */}
              <Field.Slider
                name="experienceYears"
                label="Years of Experience"
                min={0}
                max={20}
                step={1}
                valueLabelDisplay="auto"
                formatValue={(val) => `${val} year${val === 1 ? '' : 's'}`}
              />

              {/* 7. Field.Radio */}
              <Field.Radio
                name="plan"
                label="Subscription Plan"
                options={PLAN_OPTIONS}
              />

              {/* 8. Multiline Field.Text */}
              <Field.Text
                name="bio"
                label="Bio (optional)"
                multiline
                rows={3}
                placeholder="Tell us about yourself..."
              />

              <Divider />

              {/* 9. Field.Switch */}
              <Field.Switch
                name="subscribeNewsletter"
                label="Subscribe to weekly developer updates"
              />

              {/* 10. Field.Checkbox */}
              <Field.Checkbox
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
                  type="reset"
                  variant="outlined"
                  onClick={() => setSubmittedData(null)}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </Stack>
            </Stack>
          </Form>
        </CardContent>
      </Card>

      {/* Success output */}
      {submittedData && (
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
    </Box>
  )
}
