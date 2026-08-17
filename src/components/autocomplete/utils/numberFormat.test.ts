import { describe, it, expect } from 'vitest'
import {
  createCurrencyOptions,
  createNumberOptions,
  filterNumericOptions,
  formatOptionLabel,
} from './numberFormat'
import type { AutocompleteOption } from '../types'
import type { FilterOptionsState } from '@mui/material'

describe('autocomplete numberFormat utilities', () => {
  describe('createCurrencyOptions', () => {
    it('creates options with formatted labels and raw numeric values', () => {
      const options = createCurrencyOptions([10000, 50000, 1000000], {
        thousandSeparator: '.',
        decimalSeparator: ',',
      })

      expect(options).toEqual([
        { value: 10000, label: '10.000' },
        { value: 50000, label: '50.000' },
        { value: 1000000, label: '1.000.000' },
      ])
    })

    it('supports custom getSubtitle and getMeta callbacks', () => {
      const options = createCurrencyOptions([50000], {
        thousandSeparator: '.',
        getSubtitle: (raw, formatted) => `Nominal: Rp ${formatted} (Raw: ${raw})`,
        getMeta: (raw) => ({ isLarge: raw >= 100000 }),
      })

      expect(options[0]).toEqual({
        value: 50000,
        label: '50.000',
        subtitle: 'Nominal: Rp 50.000 (Raw: 50000)',
        isLarge: false,
      })
    })
  })

  describe('createNumberOptions', () => {
    it('generates options without separators when desired', () => {
      const options = createNumberOptions([3, 6, 12], {
        thousandSeparator: '',
        getSubtitle: (n) => `${n} Bulan`,
      })

      expect(options).toEqual([
        { value: 3, label: '3', subtitle: '3 Bulan' },
        { value: 6, label: '6', subtitle: '6 Bulan' },
        { value: 12, label: '12', subtitle: '12 Bulan' },
      ])
    })
  })

  describe('formatOptionLabel', () => {
    it('formats a numeric value with currency defaults', () => {
      expect(formatOptionLabel(2500000, { thousandSeparator: '.' })).toBe('2.500.000')
      expect(
        formatOptionLabel(1500.5, { thousandSeparator: ',', decimalSeparator: '.' })
      ).toBe('1,500.5')
    })
  })

  describe('filterNumericOptions', () => {
    const options: AutocompleteOption[] = [
      { value: 10000, label: '10.000', subtitle: 'Sepuluh Ribu' },
      { value: 25000, label: '25.000', subtitle: 'Dua Puluh Lima Ribu' },
      { value: 100000, label: '100.000', subtitle: 'Seratus Ribu' },
      { value: 1000000, label: '1.000.000', subtitle: 'Satu Juta' },
    ]

    const filter = filterNumericOptions({ thousandSeparator: '.', decimalSeparator: ',' })

    it('returns all options when input is empty', () => {
      const state: FilterOptionsState<AutocompleteOption> = {
        inputValue: '',
        getOptionLabel: (opt) => opt.label,
      }
      expect(filter(options, state)).toEqual(options)
    })

    it('matches by raw digits', () => {
      const state: FilterOptionsState<AutocompleteOption> = {
        inputValue: '25',
        getOptionLabel: (opt) => opt.label,
      }
      const results = filter(options, state)
      expect(results).toHaveLength(1)
      expect(results[0].value).toBe(25000)
    })

    it('matches by formatted label substring with dots', () => {
      const state: FilterOptionsState<AutocompleteOption> = {
        inputValue: '1.000',
        getOptionLabel: (opt) => opt.label,
      }
      const results = filter(options, state)
      expect(results.map((r) => r.value)).toEqual([1000000])
    })

    it('matches options starting with 10 (both 10.000 and 100.000 and 1.000.000)', () => {
      const state: FilterOptionsState<AutocompleteOption> = {
        inputValue: '10',
        getOptionLabel: (opt) => opt.label,
      }
      const results = filter(options, state)
      expect(results.map((r) => r.value)).toEqual([10000, 100000, 1000000])
    })
  })
})
