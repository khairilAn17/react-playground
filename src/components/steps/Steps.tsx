import {
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from '@mui/material'
import type { StepperProps } from '@mui/material'

export interface StepItem {
  key?: string
  label: string
  completed?: boolean
}

export interface StepsProps extends Omit<StepperProps, 'children' | 'activeStep'> {
  /** Array of step labels or step objects */
  steps: (string | StepItem)[]
  /** Active zero-indexed step number */
  currentStep?: number
  /** Callback when a step item is clicked (enables StepButton navigation) */
  onStepClick?: (index: number) => void
}

/**
 * Steps
 *
 * A horizontal multi-step progress indicator built on MUI Stepper.
 * Extends MuiStepperProps for complete theming flexibility.
 * Reusable in page headers, drawers, dialogs, and standalone forms.
 *
 * @example
 * <Steps steps={['Detail', 'Review', 'Confirm']} currentStep={1} />
 * <Steps steps={['Detail', 'Review', 'Confirm']} currentStep={1} onStepClick={setStep} />
 */
export function Steps({
  steps,
  currentStep = 0,
  onStepClick,
  sx,
  ...stepperProps
}: StepsProps) {
  if (!steps || steps.length === 0) return null

  return (
    <Stepper
      activeStep={currentStep}
      sx={{
        mb: 3,
        py: 1,
        px: 0,
        overflowX: 'auto',
        '& .MuiStepConnector-line': {
          borderColor: '#E2E8F0',
          transition: 'border-color 0.2s ease',
        },
        '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
          borderColor: '#00A99D',
        },
        '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
          borderColor: '#00A99D',
        },
        '& .MuiStepLabel-iconContainer .MuiStepIcon-root': {
          color: '#E2E8F0',
          width: 26,
          height: 26,
          transition: 'color 0.2s ease',
        },
        '& .MuiStepLabel-iconContainer .MuiStepIcon-root.Mui-active': {
          color: '#00A99D',
        },
        '& .MuiStepLabel-iconContainer .MuiStepIcon-root.Mui-completed': {
          color: '#00A99D',
        },
        '& .MuiStepIcon-text': {
          fontSize: '0.72rem',
          fontWeight: 800,
        },
        '& .MuiStepLabel-label': {
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#64748B',
          whiteSpace: 'nowrap',
        },
        '& .MuiStepLabel-label.Mui-active': {
          fontWeight: 800,
          color: '#1E293B',
        },
        '& .MuiStepLabel-label.Mui-completed': {
          fontWeight: 600,
          color: '#64748B',
        },
        ...sx,
      }}
      {...stepperProps}
    >
      {steps.map((step, index) => {
        const label = typeof step === 'string' ? step : step.label
        const completed = typeof step === 'object' ? step.completed : index < currentStep
        const stepKey = typeof step === 'object' && step.key ? step.key : `step-${index}`

        return (
          <Step key={stepKey} completed={completed}>
            {onStepClick ? (
              <StepButton onClick={() => onStepClick(index)}>
                {label}
              </StepButton>
            ) : (
              <StepLabel>{label}</StepLabel>
            )}
          </Step>
        )
      })}
    </Stepper>
  )
}
