import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@mui/material'
import { Card } from './Card'

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Card body text</Card>)
    expect(screen.getByText('Card body text')).toBeInTheDocument()
  })

  it('renders string title and subtitle', () => {
    render(
      <Card title="Limit Harian" subtitle="Rekening Utama">
        Content
      </Card>
    )
    expect(screen.getByText('Limit Harian')).toBeInTheDocument()
    expect(screen.getByText('Rekening Utama')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(
      <Card title="Settings" actions={<Button>Edit</Button>}>
        Content
      </Card>
    )
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })

  it('renders divider when divider prop is true', () => {
    const { container } = render(
      <Card title="Card" divider>
        Content
      </Card>
    )
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders without header when no title/subtitle/actions provided', () => {
    render(<Card>Standalone content</Card>)
    expect(screen.getByText('Standalone content')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
