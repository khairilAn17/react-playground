import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Alert,
  Chip,
} from '@mui/material'
import { createTypedForm } from '../../components/form'
import type { SelectOption, RadioOption, AutocompleteOption } from '../../components/form'
import { PageLayout } from '../../components/pageLayout'
import { multiStepSchema } from './multiStepSchema'
import type { MultiStepFormValues } from './multiStepSchema'

const ROLE_OPTIONS: SelectOption[] = [
  { label: 'Frontend Developer', value: 'frontend_developer' },
  { label: 'Backend Developer', value: 'backend_developer' },
  { label: 'Full Stack Developer', value: 'fullstack_developer' },
  { label: 'UI/UX Designer', value: 'designer' },
  { label: 'Product Manager', value: 'product_manager' },
]

const FRAMEWORK_OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Svelte', value: 'svelte' },
]

const PLAN_OPTIONS: RadioOption[] = [
  { label: 'Free Plan ($0/mo)', value: 'free' },
  { label: 'Pro Plan ($19/mo)', value: 'pro' },
  { label: 'Enterprise Plan (Custom)', value: 'enterprise' },
]

const STEPS = ['Personal Details', 'Professional Info', 'Subscription & Review']

const { Form, Field, useFormContext } = createTypedForm<MultiStepFormValues>()

const DEFAULT_VALUES: MultiStepFormValues = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
  },
  professional: {
    role: '',
    framework: '',
    experienceYears: 3,
  },
  subscription: {
    plan: 'free',
    subscribeNewsletter: false,
    agreeTerms: true,
  },
}

function StepActions({
  activeStep,
  totalSteps,
  onBack,
  onNextStep,
  isSubmitting,
}: {
  activeStep: number
  totalSteps: number
  onBack: () => void
  onNextStep: () => Promise<void>
  isSubmitting: boolean
}) {
  const isLastStep = activeStep === totalSteps - 1

  return (
    <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
      <Button
        type="button"
        variant="outlined"
        disabled={activeStep === 0 || isSubmitting}
        onClick={onBack}
      >
        Back
      </Button>

      {isLastStep ? (
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Submitting…' : 'Complete Registration'}
        </Button>
      ) : (
        <Button
          type="button"
          variant="contained"
          onClick={onNextStep}
          fullWidth
        >
          Next Step
        </Button>
      )}
    </Stack>
  )
}

function MultiStepWizardContent() {
  const [activeStep, setActiveStep] = useState(0)
  const { trigger, formState: { isSubmitting } } = useFormContext()

  const handleNextStep = async () => {
    const stepKeysMap: Record<number, Array<'personal' | 'professional' | 'subscription'>> = {
      0: ['personal'],
      1: ['professional'],
      2: ['subscription'],
    }

    const isValid = await trigger(stepKeysMap[activeStep])
    if (isValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1))
  }

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* STEP 1: Personal Details */}
      {activeStep === 0 && (
        <Stack spacing={2.5}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
            Step 1 of 3: Personal Details
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Field.Text
              name="personal.firstName"
              label="First Name"
              placeholder="John"
            />
            <Field.Text
              name="personal.lastName"
              label="Last Name"
              placeholder="Doe"
            />
          </Stack>
          <Field.Text
            name="personal.email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
          />
        </Stack>
      )}

      {/* STEP 2: Professional Info */}
      {activeStep === 1 && (
        <Stack spacing={2.5}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
            Step 2 of 3: Professional Info
          </Typography>
          <Field.Select
            name="professional.role"
            label="Job Role"
            options={ROLE_OPTIONS}
            searchable
          />
          <Field.Autocomplete
            name="professional.framework"
            label="Primary Tech Framework"
            options={FRAMEWORK_OPTIONS}
          />
          <Field.Slider
            name="professional.experienceYears"
            label="Years of Experience"
            min={0}
            max={20}
            formatValue={(val) => `${val} years`}
          />
        </Stack>
      )}

      {/* STEP 3: Subscription & Review */}
      {activeStep === 2 && (
        <Stack spacing={2.5}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
            Step 3 of 3: Subscription & Agreement
          </Typography>
          <Field.Radio
            name="subscription.plan"
            label="Choose Plan"
            options={PLAN_OPTIONS}
          />
          <Divider />
          <Field.Switch
            name="subscription.subscribeNewsletter"
            label="Subscribe to weekly newsletter updates"
          />
          <Field.Checkbox
            name="subscription.agreeTerms"
            label="I accept the Terms of Service and Privacy Policy"
          />
        </Stack>
      )}

      <StepActions
        activeStep={activeStep}
        totalSteps={STEPS.length}
        onBack={handleBack}
        onNextStep={handleNextStep}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

export function MultiStepForm() {
  const [submittedData, setSubmittedData] = useState<MultiStepFormValues | null>(null)

  const handleSubmit = async (data: MultiStepFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedData(data)
  }

  return (
    <PageLayout maxWidth="md">
      <PageLayout.TopBar>
        <Chip
          label="Form Workspaces"
          size="small"
          variant="outlined"
          sx={{ mr: 0.5, fontSize: '0.72rem' }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>
          /
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
          Multi-Step Wizard
        </Typography>
        <Chip label="Wizard Flow" color="secondary" size="small" sx={{ ml: 1, mr: 1 }} />
        <PageLayout.TopBar.Search placeholder="Search steps…" />
      </PageLayout.TopBar>

      <PageLayout.Header
        title="Multi-Step Wizard Form"
        subtitle="Step-by-step wizard flow with MUI Stepper & per-step schema validation using dot-paths."
        breadcrumbs={[{ label: 'Form Workspaces', href: '#' }, { label: 'Multi-Step Wizard' }]}
        status={<Chip label="Wizard Flow" color="secondary" size="small" />}
      />

      <PageLayout.Content>
        <Card variant="outlined">
          <CardContent>
            <Form
              schema={multiStepSchema}
              defaultValues={DEFAULT_VALUES}
              onSubmit={handleSubmit}
            >
              <MultiStepWizardContent />
            </Form>
          </CardContent>
        </Card>

        {submittedData && (
          <Box sx={{ mt: 1 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Multi-step form completed successfully!
            </Alert>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Final Form Output (Nested Payload)
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: 'action.hover',
                    p: 2,
                    borderRadius: 1,
                    fontSize: '0.85rem',
                    overflowX: 'auto',
                  }}
                >
                  {JSON.stringify(submittedData, null, 2)}
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </PageLayout.Content>
    </PageLayout>
  )
}
