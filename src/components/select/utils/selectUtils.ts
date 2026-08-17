import type { ReactNode } from 'react'
import type { SelectOption } from '../types'

/**
 * Normalizes border radius values to CSS string/number format.
 */
export function formatRadius(radius: number | string | undefined): string | number | undefined {
  if (radius === undefined) return undefined
  if (typeof radius === 'number') {
    return `${radius}px`
  }
  return radius
}

/**
 * Extracts searchable string text from ReactNode if it's a string or number.
 */
export function toSearchable(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  return ''
}

/**
 * Constructs a single normalized lower-cased search string from a SelectOption.
 */
export function buildSearchText(opt: SelectOption): string {
  const bulletTexts = opt.bullets ? opt.bullets.map(toSearchable).join(' ') : ''
  return [
    opt.label ?? '',
    opt.group ?? '',
    toSearchable(opt.leftTitle),
    toSearchable(opt.leftSubtitle),
    toSearchable(opt.rightTitle),
    toSearchable(opt.rightSubtitle),
    bulletTexts,
  ]
    .join(' ')
    .toLowerCase()
}

/**
 * Filters an array of options based on a search term.
 */
export function filterSelectOptions(
  options: SelectOption[],
  searchTerm: string,
  searchable: boolean
): SelectOption[] {
  if (!searchable || !searchTerm.trim()) return options
  const term = searchTerm.toLowerCase().trim()
  return options.filter((opt) => buildSearchText(opt).includes(term))
}

export interface OptionGroup {
  name?: string
  options: SelectOption[]
}

/**
 * Groups an array of options by `groupBy` function or `option.group`.
 */
export function groupSelectOptions(
  options: SelectOption[],
  groupBy?: (option: SelectOption) => string | undefined
): OptionGroup[] | null {
  const hasGrouping = groupBy ? true : options.some((opt) => Boolean(opt.group))
  if (!hasGrouping) return null

  const groups: OptionGroup[] = []
  const groupMap = new Map<string | undefined, SelectOption[]>()

  options.forEach((opt) => {
    const g = groupBy ? groupBy(opt) : opt.group
    if (!groupMap.has(g)) {
      const list: SelectOption[] = []
      groupMap.set(g, list)
      groups.push({ name: g, options: list })
    }
    groupMap.get(g)!.push(opt)
  })

  return groups
}
