import type { AutocompleteOption } from '../types'
import type { AutocompleteRenderInputParams } from '@mui/material'

// ── Stable option defaults ────────────────────────────────────────────────────
// Defined at module scope so their references never change between renders.
// Inline prop defaults produce new function objects on every render, which
// invalidates every useCallback/useMemo that lists them as a dependency.

export function defaultGetOptionLabel<T>(option: T): string {
  if (typeof option === 'string') return option
  if (option && typeof option === 'object' && 'label' in option) {
    return String((option as unknown as AutocompleteOption).label ?? '')
  }
  return String(option ?? '')
}

export function defaultIsOptionEqualToValue<T>(option: T, value: T): boolean {
  if (option === value) return true
  if (
    option &&
    value &&
    typeof option === 'object' &&
    typeof value === 'object' &&
    'value' in option &&
    'value' in value
  ) {
    return (
      (option as unknown as AutocompleteOption).value ===
      (value as unknown as AutocompleteOption).value
    )
  }
  return false
}

// ── MUI InputProps escape hatch ───────────────────────────────────────────────
// MUI's AutocompleteRenderInputParams.InputProps is a union of three InputBase
// variants (Outlined / Filled / Standard). We need startAdornment/endAdornment
// to preserve the popup-indicator and tags MUI injects there.
// Isolating the cast here keeps it out of component logic.
export type RawMuiInputProps = {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  ref?: React.Ref<unknown>
  className?: string
  [key: string]: unknown
}

export function extractMuiInputProps(params: AutocompleteRenderInputParams): RawMuiInputProps {
  const raw = params as unknown as { InputProps?: RawMuiInputProps }
  return raw.InputProps ?? {}
}
