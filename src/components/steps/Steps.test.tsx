import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Steps } from './Steps'

const STRING_STEPS = ['Detail', 'Review', 'Konfirmasi']

const OBJECT_STEPS = [
  { key: 'detail', label: 'Detail' },
  { key: 'review', label: 'Review', completed: true },
  { key: 'confirm', label: 'Konfirmasi' },
]

describe('Steps', () => {
  it('renders nothing when steps is empty', () => {
    const { container } = render(<Steps steps={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders all step labels from string array', () => {
    render(<Steps steps={STRING_STEPS} currentStep={0} />)
    expect(screen.getByText('Detail')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Konfirmasi')).toBeInTheDocument()
  })

  it('renders all step labels from object array', () => {
    render(<Steps steps={OBJECT_STEPS} currentStep={0} />)
    expect(screen.getByText('Detail')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Konfirmasi')).toBeInTheDocument()
  })

  it('defaults to currentStep=0 when not provided', () => {
    render(<Steps steps={STRING_STEPS} />)
    // MUI Stepper marks the active step with aria-current
    const activeLabel = screen.getByText('Detail').closest('.MuiStepLabel-root')
    expect(activeLabel?.querySelector('.Mui-active')).toBeInTheDocument()
  })

  it('marks the correct step as active', () => {
    render(<Steps steps={STRING_STEPS} currentStep={1} />)
    const activeLabel = screen.getByText('Review').closest('.MuiStepLabel-root')
    expect(activeLabel?.querySelector('.Mui-active')).toBeInTheDocument()
  })

  it('renders StepButton (tab role) when onStepClick is provided', () => {
    const handleClick = vi.fn()
    render(<Steps steps={STRING_STEPS} currentStep={0} onStepClick={handleClick} />)

    // MUI StepButton renders with role="tab" inside a role="tablist" Stepper
    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).toBe(STRING_STEPS.length)
  })

  it('calls onStepClick with the correct index when active step is clicked', () => {
    const handleClick = vi.fn()
    render(<Steps steps={STRING_STEPS} currentStep={1} onStepClick={handleClick} />)

    // 'Review' is the active (non-disabled) tab at index 1
    const reviewTab = screen.getByRole('tab', { name: 'Review' })
    fireEvent.click(reviewTab)
    expect(handleClick).toHaveBeenCalledWith(1)
  })

  it('does not render tabs when onStepClick is not provided', () => {
    render(<Steps steps={STRING_STEPS} currentStep={0} />)
    expect(screen.queryAllByRole('tab')).toHaveLength(0)
  })

  it('respects completed flag on step objects', () => {
    const steps = [
      { label: 'Detail', completed: true },
      { label: 'Review', completed: false },
    ]
    render(<Steps steps={steps} currentStep={1} />)
    // Completed step icon gets Mui-completed class — check the icon container
    const detailLabel = screen.getByText('Detail').closest('.MuiStepLabel-root')
    expect(detailLabel?.querySelector('.Mui-completed')).toBeInTheDocument()
  })
})
