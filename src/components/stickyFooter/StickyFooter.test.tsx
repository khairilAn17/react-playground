import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@mui/material'
import { StickyFooter } from './StickyFooter'

describe('StickyFooter', () => {
  it('renders children', () => {
    render(
      <StickyFooter>
        <Button>Save</Button>
      </StickyFooter>
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <StickyFooter>
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </StickyFooter>
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('defaults to right alignment', () => {
    const { container } = render(
      <StickyFooter>
        <Button>Save</Button>
      </StickyFooter>
    )
    const inner = container.querySelector('.MuiBox-root')
    expect(inner).toHaveStyle({ justifyContent: 'flex-end' })
  })

  it('applies left alignment', () => {
    const { container } = render(
      <StickyFooter align="left">
        <Button>Save</Button>
      </StickyFooter>
    )
    const inner = container.querySelector('.MuiBox-root')
    expect(inner).toHaveStyle({ justifyContent: 'flex-start' })
  })

  it('applies center alignment', () => {
    const { container } = render(
      <StickyFooter align="center">
        <Button>Save</Button>
      </StickyFooter>
    )
    const inner = container.querySelector('.MuiBox-root')
    expect(inner).toHaveStyle({ justifyContent: 'center' })
  })

  it('applies space-between for "between" alignment', () => {
    const { container } = render(
      <StickyFooter align="between">
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </StickyFooter>
    )
    const inner = container.querySelector('.MuiBox-root')
    expect(inner).toHaveStyle({ justifyContent: 'space-between' })
  })

  it('renders children directly (no Stack wrapper) when align is "between"', () => {
    const { container } = render(
      <StickyFooter align="between">
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </StickyFooter>
    )
    // With align="between", children are rendered directly without a Stack wrapper
    const stacks = container.querySelectorAll('.MuiStack-root')
    expect(stacks).toHaveLength(0)
  })

  it('wraps children in a Stack for non-between alignments', () => {
    const { container } = render(
      <StickyFooter align="right">
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </StickyFooter>
    )
    const stacks = container.querySelectorAll('.MuiStack-root')
    expect(stacks).toHaveLength(1)
  })

  it('applies sticky positioning via Paper', () => {
    const { container } = render(
      <StickyFooter>
        <Button>Save</Button>
      </StickyFooter>
    )
    const paper = container.querySelector('.MuiPaper-root')
    expect(paper).toBeInTheDocument()
  })
})
