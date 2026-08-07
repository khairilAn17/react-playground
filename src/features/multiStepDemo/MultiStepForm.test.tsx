import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MultiStepForm } from './MultiStepForm'

describe('MultiStepForm', () => {
  it('renders Step 1 fields on initial mount', () => {
    render(<MultiStepForm />)

    expect(screen.getByText('Step 1 of 3: Personal Details')).toBeInTheDocument()
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
  })

  it('prevents advancing to Step 2 when required fields in Step 1 are empty', async () => {
    render(<MultiStepForm />)

    const nextBtn = screen.getByText('Next Step')
    fireEvent.click(nextBtn)

    await waitFor(() => {
      expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument()
    })
    // Remains on Step 1
    expect(screen.getByText('Step 1 of 3: Personal Details')).toBeInTheDocument()
  })

  it('advances to Step 2 when Step 1 is valid', async () => {
    render(<MultiStepForm />)

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })

    fireEvent.click(screen.getByText('Next Step'))

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 3: Professional Info')).toBeInTheDocument()
    })
  })
})
