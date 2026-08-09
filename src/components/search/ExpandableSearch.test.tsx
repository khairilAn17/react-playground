import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ExpandableSearch } from './ExpandableSearch'

describe('ExpandableSearch', () => {
  it('renders a search icon button in collapsed state', () => {
    render(<ExpandableSearch />)
    expect(screen.getByLabelText('Open search')).toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Search…')).not.toBeInTheDocument()
  })

  it('expands input when search button is clicked', async () => {
    render(<ExpandableSearch placeholder="Search items…" />)
    fireEvent.click(screen.getByLabelText('Open search'))
    expect(await screen.findByPlaceholderText('Search items…')).toBeInTheDocument()
  })

  it('collapses when close button is clicked', async () => {
    render(<ExpandableSearch placeholder="Search items…" />)
    fireEvent.click(screen.getByLabelText('Open search'))
    expect(await screen.findByPlaceholderText('Search items…')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Close search'))
    expect(screen.queryByPlaceholderText('Search items…')).not.toBeInTheDocument()
  })

  it('calls onSearch with value on Enter key', async () => {
    const handleSearch = vi.fn()
    render(<ExpandableSearch placeholder="Search…" onSearch={handleSearch} />)
    fireEvent.click(screen.getByLabelText('Open search'))
    const input = await screen.findByPlaceholderText('Search…')
    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(handleSearch).toHaveBeenCalledWith('hello')
  })

  it('collapses on Escape key', async () => {
    render(<ExpandableSearch placeholder="Search…" />)
    fireEvent.click(screen.getByLabelText('Open search'))
    const input = await screen.findByPlaceholderText('Search…')
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByPlaceholderText('Search…')).not.toBeInTheDocument()
  })
})
