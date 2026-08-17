import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import { SearchInput } from './SearchInput'

function ControlledSearch() {
  const [val, setVal] = useState('initial')
  return <SearchInput value={val} onValueChange={(next) => setVal(next)} placeholder="Search team" />
}

describe('SearchInput Primitive', () => {
  it('renders with placeholder and leading search icon', () => {
    render(<SearchInput placeholder="Search accounts..." />)
    expect(screen.getByPlaceholderText('Search accounts...')).toBeInTheDocument()
  })

  it('updates controlled value and fires onValueChange with string, and native onChange with event', () => {
    const handleValueChange = vi.fn()
    const handleChange = vi.fn()
    render(
      <SearchInput
        value="test"
        onValueChange={handleValueChange}
        onChange={handleChange}
        placeholder="Search..."
      />
    )

    const input = screen.getByPlaceholderText('Search...')
    expect(input).toHaveValue('test')

    fireEvent.change(input, { target: { value: 'new query' } })
    // onValueChange receives the plain string
    expect(handleValueChange).toHaveBeenCalledWith('new query')
    // native onChange receives the SyntheticEvent (first arg)
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.anything() }))
  })

  it('renders clear button when text is present and clears on click', () => {
    render(<ControlledSearch />)

    const clearBtn = screen.getByLabelText('Clear search text')
    expect(clearBtn).toBeInTheDocument()

    fireEvent.click(clearBtn)

    const input = screen.getByPlaceholderText('Search team')
    expect(input).toHaveValue('')
    expect(screen.queryByLabelText('Clear search text')).not.toBeInTheDocument()
  })

  it('triggers onSearch when Enter key is pressed', () => {
    const handleSearch = vi.fn()
    render(<SearchInput value="hello world" onSearch={handleSearch} placeholder="Search..." />)

    const input = screen.getByPlaceholderText('Search...')
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(handleSearch).toHaveBeenCalledWith('hello world')
  })

  it('renders shortcut badge when provided and input is empty', () => {
    render(<SearchInput value="" shortcut="⌘K" placeholder="Search..." />)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('renders different visual variants (pill, filled, standard, outlined)', () => {
    const { rerender } = render(<SearchInput variant="pill" placeholder="Pill search" />)
    expect(screen.getByPlaceholderText('Pill search')).toBeInTheDocument()

    rerender(<SearchInput variant="filled" placeholder="Filled search" />)
    expect(screen.getByPlaceholderText('Filled search')).toBeInTheDocument()

    rerender(<SearchInput variant="standard" placeholder="Standard search" />)
    expect(screen.getByPlaceholderText('Standard search')).toBeInTheDocument()
  })

  it('renders loading spinner and hides clear button when loading=true', () => {
    render(<SearchInput value="query text" loading placeholder="Search..." />)

    expect(screen.getByRole('progressbar', { name: 'Loading search results' })).toBeInTheDocument()
    expect(screen.queryByLabelText('Clear search text')).not.toBeInTheDocument()
  })
})


