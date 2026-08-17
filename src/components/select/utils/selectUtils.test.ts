import { describe, it, expect } from 'vitest'
import {
  formatRadius,
  toSearchable,
  buildSearchText,
  filterSelectOptions,
  groupSelectOptions,
} from './selectUtils'
import type { SelectOption } from '../types'

describe('Select Utils', () => {
  describe('formatRadius', () => {
    it('formats number to px and preserves string/undefined', () => {
      expect(formatRadius(12)).toBe('12px')
      expect(formatRadius('50%')).toBe('50%')
      expect(formatRadius(undefined)).toBeUndefined()
    })
  })

  describe('toSearchable', () => {
    it('converts string and number nodes to string', () => {
      expect(toSearchable('Hello')).toBe('Hello')
      expect(toSearchable(12345)).toBe('12345')
      expect(toSearchable(null)).toBe('')
      expect(toSearchable(undefined)).toBe('')
    })
  })

  describe('buildSearchText', () => {
    it('combines labels, subtitles, and bullets into lowercased search text', () => {
      const opt: SelectOption = {
        value: 'bifast',
        label: 'BI Fast',
        group: 'Transfer',
        leftTitle: 'BI Fast Transfer',
        bullets: ['Real-time 24/7', 'Limit 250jt'],
      }
      const text = buildSearchText(opt)
      expect(text).toContain('bi fast')
      expect(text).toContain('transfer')
      expect(text).toContain('real-time 24/7')
      expect(text).toContain('limit 250jt')
    })
  })

  describe('filterSelectOptions', () => {
    const options: SelectOption[] = [
      { value: 'bca', label: 'Bank Central Asia' },
      { value: 'bsi', label: 'Bank Syariah Indonesia' },
      { value: 'mandiri', label: 'Bank Mandiri' },
    ]

    it('returns all options when searchable is false or term is empty', () => {
      expect(filterSelectOptions(options, '', true)).toHaveLength(3)
      expect(filterSelectOptions(options, 'syariah', false)).toHaveLength(3)
    })

    it('filters options based on search query', () => {
      const filtered = filterSelectOptions(options, 'syariah', true)
      expect(filtered).toHaveLength(1)
      expect(filtered[0].value).toBe('bsi')
    })
  })

  describe('groupSelectOptions', () => {
    const options: SelectOption[] = [
      { value: '1', label: 'Option 1', group: 'Group A' },
      { value: '2', label: 'Option 2', group: 'Group A' },
      { value: '3', label: 'Option 3', group: 'Group B' },
    ]

    it('returns null if no grouping is present', () => {
      expect(groupSelectOptions([{ value: '1', label: 'A' }])).toBeNull()
    })

    it('groups options by group property', () => {
      const grouped = groupSelectOptions(options)
      expect(grouped).toHaveLength(2)
      expect(grouped?.[0].name).toBe('Group A')
      expect(grouped?.[0].options).toHaveLength(2)
      expect(grouped?.[1].name).toBe('Group B')
      expect(grouped?.[1].options).toHaveLength(1)
    })

    it('supports custom groupBy function', () => {
      const customGrouped = groupSelectOptions(
        [{ value: 'apple' }, { value: 'banana' }],
        (opt) => (opt.value === 'apple' ? 'Fruits' : 'Other')
      )
      expect(customGrouped).toHaveLength(2)
      expect(customGrouped?.[0].name).toBe('Fruits')
    })
  })
})
