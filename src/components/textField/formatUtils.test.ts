import { describe, it, expect } from 'vitest'
import { formatNumberValue, parseNumberValue } from './formatUtils'

describe('formatUtils', () => {
  describe('formatNumberValue (Indonesian format: dots for thousand, commas for decimal)', () => {
    it('formats integer strings with thousand dots (e.g. 1000000 -> 1.000.000)', () => {
      expect(formatNumberValue('1000000')).toBe('1.000.000')
      expect(formatNumberValue(500000)).toBe('500.000')
      expect(formatNumberValue('1250000000')).toBe('1.250.000.000')
    })

    it('formats numbers with commas for decimals (e.g. 1000000.50 -> 1.000.000,50)', () => {
      expect(formatNumberValue('1000000.50')).toBe('1.000.000,50')
      expect(formatNumberValue('1000000,75')).toBe('1.000.000,75')
    })

    it('respects decimalScale constraint', () => {
      expect(formatNumberValue('1000.12345', { decimalScale: 2 })).toBe('1.000,12')
      expect(formatNumberValue('1000.12345', { decimalScale: 4 })).toBe('1.000,1234')
      expect(formatNumberValue('1000.12345', { allowDecimals: false })).toBe('1.000')
    })

    it('formats with fixedDecimals on request', () => {
      expect(formatNumberValue('1000000', { fixedDecimals: true, decimalScale: 2 })).toBe('1.000.000,00')
    })
  })

  describe('formatNumberValue (US/International format: commas for thousand, dots for decimal)', () => {
    it('formats with custom separators (1000000.50 -> 1,000,000.50)', () => {
      const usOptions = { thousandSeparator: ',', decimalSeparator: '.' }
      expect(formatNumberValue('1000000.50', usOptions)).toBe('1,000,000.50')
      expect(formatNumberValue(2500000, usOptions)).toBe('2,500,000')
    })
  })

  describe('parseNumberValue', () => {
    it('parses Indonesian formatted string back to standard number string', () => {
      expect(parseNumberValue('1.000.000')).toBe('1000000')
      expect(parseNumberValue('1.000.000,50')).toBe('1000000.50')
      expect(parseNumberValue('250.000,00')).toBe('250000.00')
    })

    it('parses US formatted string back to standard number string', () => {
      const usOptions = { thousandSeparator: ',', decimalSeparator: '.' }
      expect(parseNumberValue('1,000,000.50', usOptions)).toBe('1000000.50')
    })
  })
})
