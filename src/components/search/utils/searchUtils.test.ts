import { describe, it, expect } from 'vitest'
import { formatBorderRadius, getVariantStyles, getSizeStyles } from './searchUtils'

describe('searchUtils', () => {
  describe('formatBorderRadius', () => {
    it('returns undefined if value is undefined', () => {
      expect(formatBorderRadius(undefined)).toBeUndefined()
    })

    it('formats numeric values with px suffix', () => {
      expect(formatBorderRadius(12)).toBe('12px')
      expect(formatBorderRadius(50)).toBe('50px')
    })

    it('returns string values as-is', () => {
      expect(formatBorderRadius('2rem')).toBe('2rem')
      expect(formatBorderRadius('9999px')).toBe('9999px')
    })
  })

  describe('getSizeStyles', () => {
    it('returns correct styles for small size', () => {
      const style = getSizeStyles('small')
      expect(style.minHeight).toBe(34)
      expect(style.fontSize).toBe('0.8125rem')
      expect(style.iconSize).toBe('1rem')
      expect(style.spinnerSize).toBe(15)
    })

    it('returns correct styles for medium size', () => {
      const style = getSizeStyles('medium')
      expect(style.minHeight).toBe(40)
      expect(style.fontSize).toBe('0.875rem')
      expect(style.iconSize).toBe('1.15rem')
      expect(style.spinnerSize).toBe(18)
    })

    it('returns correct styles for large size', () => {
      const style = getSizeStyles('large')
      expect(style.minHeight).toBe(48)
      expect(style.fontSize).toBe('1rem')
      expect(style.iconSize).toBe('1.35rem')
      expect(style.spinnerSize).toBe(22)
    })
  })

  describe('getVariantStyles', () => {
    it('returns pill variant styles with 50px radius by default', () => {
      const style = getVariantStyles('pill') as Record<string, unknown>
      expect(style.borderRadius).toBe('50px')
      expect(style.bgcolor).toBe('grey.100')
      expect(style.borderColor).toBe('transparent')
    })

    it('returns outlined variant styles with 10px radius and paper bgcolor', () => {
      const style = getVariantStyles('outlined') as Record<string, unknown>
      expect(style.borderRadius).toBe('10px')
      expect(style.bgcolor).toBe('background.paper')
      expect(style.borderColor).toBe('grey.300')
    })

    it('returns filled variant styles with grey.50 bgcolor', () => {
      const style = getVariantStyles('filled') as Record<string, unknown>
      expect(style.borderRadius).toBe('10px')
      expect(style.bgcolor).toBe('grey.50')
      expect(style.borderColor).toBe('grey.200')
    })

    it('returns standard variant styles with underline only and transparent bgcolor', () => {
      const style = getVariantStyles('standard') as Record<string, unknown>
      expect(style.borderRadius).toBe(0)
      expect(style.bgcolor).toBe('transparent')
      expect(style.borderBottomColor).toBe('grey.200')
    })

    it('respects custom borderRadius override', () => {
      const style = getVariantStyles('pill', { borderRadius: 12 }) as Record<string, unknown>
      expect(style.borderRadius).toBe('12px')
    })

    it('respects disableFocusRing override', () => {
      const normalStyle = getVariantStyles('outlined', { focusBorderColor: '#00A39D' }) as Record<string, unknown>
      const normalFocus = normalStyle['&.Mui-focused'] as Record<string, unknown>
      expect(normalFocus.borderColor).toBe('#00A39D')

      const disabledStyle = getVariantStyles('outlined', { disableFocusRing: true }) as Record<string, unknown>
      const disabledFocus = disabledStyle['&.Mui-focused'] as Record<string, unknown>
      expect(disabledFocus.borderColor).toBe('grey.300')
    })
  })
})
