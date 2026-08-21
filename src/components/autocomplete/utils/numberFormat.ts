import { formatNumberValue, parseNumberValue } from '../../textField'
import type { NumberFormatOptions } from '../../textField'
import type { AutocompleteOption } from '../types'
import type { FilterOptionsState } from '@mui/material'

// ── Re-export for consumers who import from autocomplete ─────────────────────
export type { NumberFormatOptions }

// ── createCurrencyOptions ─────────────────────────────────────────────────────
/**
 * Build an `AutocompleteOption[]` array where each option's **label** is the
 * formatted display string and **value** is the raw numeric value (number).
 *
 * This is the recommended best practice for pre-defined amount pickers
 * (e.g. top-up presets, installment tiers, fee schedules).
 * Formatting is done once at data-definition time — the Autocomplete component
 * stays generic.
 *
 * @example
 * const TOPUP_OPTIONS = createCurrencyOptions(
 *   [10000, 25000, 50000, 100000, 250000, 500000, 1000000],
 *   { thousandSeparator: '.', decimalSeparator: ',' }
 * )
 * // [
 * //   { value: 10000,   label: '10.000',    subtitle: '10.000' },
 * //   { value: 25000,   label: '25.000',    subtitle: '25.000' },
 * //   ...
 * // ]
 */
export function createCurrencyOptions(
  amounts: number[],
  options: NumberFormatOptions & {
    /** Optional function to build the subtitle for each option. */
    getSubtitle?: (raw: number, formatted: string) => string
    /** Optional function to build extra metadata on each option. */
    getMeta?: (raw: number) => Record<string, unknown>
  } = {}
): AutocompleteOption[] {
  const { getSubtitle, getMeta, ...formatOpts } = options

  return amounts.map((raw) => {
    const formatted = formatNumberValue(raw, formatOpts)
    return {
      value: raw,
      label: formatted,
      ...(getSubtitle ? { subtitle: getSubtitle(raw, formatted) } : {}),
      ...(getMeta ? getMeta(raw) : {}),
    }
  })
}

// ── createNumberOptions ───────────────────────────────────────────────────────
/**
 * Generic version of `createCurrencyOptions` that accepts any formatting
 * options (including no thousand separator for plain integers).
 *
 * @example
 * // Plain integer list — no separators
 * const INSTALLMENT_OPTIONS = createNumberOptions([3, 6, 12, 24, 36], {
 *   thousandSeparator: '',
 *   decimalSeparator: '',
 *   allowDecimals: false,
 *   getSubtitle: (n) => `${n} bulan cicilan`,
 * })
 */
export const createNumberOptions = createCurrencyOptions

// ── filterNumericOptions ──────────────────────────────────────────────────────
/**
 * A `filterOptions` factory for Autocomplete components whose option values
 * are numeric amounts with formatted labels.
 *
 * Matches on BOTH the raw number string AND the formatted label, so the user
 * can type either `"50000"` or `"50.000"` to find the same option.
 *
 * Pass the result directly to the Autocomplete `filterOptions` prop.
 *
 * @example
 * <Autocomplete
 *   options={TOPUP_OPTIONS}
 *   filterOptions={filterNumericOptions({ thousandSeparator: '.' })}
 * />
 */
export function filterNumericOptions(formatOpts: NumberFormatOptions = {}) {
  return function filter<T>(
    options: T[],
    state: FilterOptionsState<T>
  ): T[] {
    const input = state.inputValue.trim()
    if (!input) return options

    const hasFormattingChars = /\D/.test(input)
    const rawDigits = input.replace(/\D/g, '')

    return options.filter((opt) => {
      // Support both string and AutocompleteOption shapes
      const record = opt as unknown as Partial<AutocompleteOption>
      const label = typeof opt === 'string'
        ? opt
        : String(record?.label ?? '')

      const subtitle = typeof opt === 'object' && opt !== null && 'subtitle' in opt
        ? String(record?.subtitle ?? '')
        : ''

      const value = typeof opt === 'string'
        ? opt
        : String(record?.value ?? '')

      const rawValue = parseNumberValue(value, formatOpts)
      const rawValueDigits = rawValue.replace(/\D/g, '')

      // Match if the formatted label or subtitle contains the typed text
      const labelMatch = label.toLowerCase().includes(input.toLowerCase())
      const subtitleMatch = subtitle.toLowerCase().includes(input.toLowerCase())

      // If user typed raw digits without punctuation (e.g. "25" or "50"), match prefix on raw number
      const rawMatch = !hasFormattingChars && rawDigits.length > 0 && rawValueDigits.startsWith(rawDigits)

      return labelMatch || subtitleMatch || rawMatch
    })
  }
}

// ── formatOptionLabel ─────────────────────────────────────────────────────────
/**
 * Formats a single number into a display string using the given options.
 * Thin wrapper around `formatNumberValue` for use in `getOptionLabel`.
 *
 * @example
 * <Autocomplete
 *   getOptionLabel={(opt) =>
 *     typeof opt === 'object' ? formatOptionLabel(Number(opt.value)) : opt
 *   }
 * />
 */
export function formatOptionLabel(
  raw: number | string,
  options: NumberFormatOptions = {}
): string {
  return formatNumberValue(raw, options)
}
