import { Box, Typography, Stack } from '@mui/material'
import type { PageStepItem } from './types'

export interface PageStepsProps {
  /** Array of step labels or objects */
  steps: (string | PageStepItem)[]
  /** Active zero-indexed step number */
  currentStep?: number
  /** Callback when step item is clicked */
  onStepClick?: (index: number) => void
}

const TEAL_PRIMARY = '#00A99D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

export function PageSteps({ steps, currentStep = 0, onStepClick }: PageStepsProps) {
  if (!steps || steps.length === 0) return null

  return (
    <Box sx={{ mb: 3, overflowX: 'auto', py: 1 }}>
      <Stack direction="row" spacing={{ xs: 1.5, sm: 2.5 }} sx={{ alignItems: 'center' }}>
        {steps.map((step, index) => {
          const label = typeof step === 'string' ? step : step.label
          const isActive = index === currentStep
          const isCompleted = index < currentStep || (typeof step === 'object' && step.completed)

          return (
            <Stack key={index} direction="row" spacing={{ xs: 1.5, sm: 2.5 }} sx={{ alignItems: 'center' }}>
              <Box
                onClick={() => onStepClick?.(index)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: onStepClick ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
              >
                {/* Step Circle Badge */}
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    bgcolor: isActive || isCompleted ? TEAL_PRIMARY : '#E2E8F0',
                    color: isActive || isCompleted ? 'white' : TEXT_MUTED,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {index + 1}
                </Box>

                {/* Step Label */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? TEXT_MAIN : TEXT_MUTED,
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </Typography>
              </Box>

              {/* Connecting Line between steps */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    width: { xs: 24, sm: 40 },
                    height: 2,
                    bgcolor: index < currentStep ? TEAL_PRIMARY : '#E2E8F0',
                    borderRadius: 1,
                    transition: 'all 0.2s ease',
                  }}
                />
              )}
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}
