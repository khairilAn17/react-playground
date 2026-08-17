export interface NumberFormatOptions {
  /**
   * Character used to group thousands.
   * @default '.' (Indonesian locale)
   */
  thousandSeparator?: string
  /**
   * Character used for decimal point.
   * @default ',' (Indonesian locale)
   */
  decimalSeparator?: string
  /**
   * Maximum number of decimal digits allowed.
   * @default 2
   */
  decimalScale?: number
  /**
   * Whether decimal entry is permitted.
   * @default true
   */
  allowDecimals?: boolean
  /**
   * Whether to format with fixed trailing decimal zeros (e.g. ",00") on blur.
   * @default false
   */
  fixedDecimals?: boolean
  /**
   * Whether negative numbers are allowed.
   * @default false
   */
  allowNegative?: boolean
}

/**
 * Formats a raw numerical string or number into a formatted display string.
 *
 * @example
 * formatNumberValue('1000000', { thousandSeparator: '.', decimalSeparator: ',' })
 * // -> '1.000.000'
 *
 * @example
 * formatNumberValue('1000000.5', { thousandSeparator: '.', decimalSeparator: ',' })
 * // -> '1.000.000,5'
 */
export function formatNumberValue(
  value: string | number | undefined | null,
  options: NumberFormatOptions = {}
): string {
  if (value === undefined || value === null || value === '') return ''

  const {
    thousandSeparator = '.',
    decimalSeparator = ',',
    decimalScale = 2,
    allowDecimals = true,
    fixedDecimals = false,
    allowNegative = false,
  } = options

  let str = String(value).trim()

  const isNegative = allowNegative && str.startsWith('-')
  if (isNegative) {
    str = str.slice(1)
  }

  const decSep = decimalSeparator
  let integerPart = ''
  let decimalPart: string | undefined = undefined

  // Check if string has explicit configured decimalSeparator
  if (decSep && str.includes(decSep)) {
    const parts = str.split(decSep)
    integerPart = parts[0].replace(/\D/g, '')
    decimalPart = allowDecimals && parts.length > 1 ? parts[1].replace(/\D/g, '') : undefined
  } else if (str.includes('.')) {
    if (decSep === '.') {
      // Dot is the decimal separator (US/International)
      const parts = str.split('.')
      integerPart = parts[0].replace(/\D/g, '')
      decimalPart = allowDecimals && parts.length > 1 ? parts[1].replace(/\D/g, '') : undefined
    } else {
      // Dot is thousandSeparator in configured locale (e.g. Indonesian)
      // Check if standard JS float string (e.g. from Number or database: '1000.5' or '1000.1234')
      const isStandardFloat = /^\d+\.\d+$/.test(str)
      if (isStandardFloat) {
        const parts = str.split('.')
        integerPart = parts[0].replace(/\D/g, '')
        decimalPart = allowDecimals && parts.length > 1 ? parts[1].replace(/\D/g, '') : undefined
      } else {
        // Formatted thousand string (e.g. '1.000.000')
        integerPart = str.replace(/\D/g, '')
      }
    }
  } else {
    // No decimal separator
    integerPart = str.replace(/\D/g, '')
  }

  if (!integerPart && decimalPart === undefined) {
    return isNegative ? '-' : ''
  }

  // Remove leading zeros from integer part unless it's just '0'
  if (integerPart.length > 1 && integerPart.startsWith('0')) {
    integerPart = integerPart.replace(/^0+/, '') || '0'
  }

  // Add thousand separators
  const formattedInteger = thousandSeparator
    ? integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        thousandSeparator
      )
    : integerPart

  let result = formattedInteger || '0'

  if (allowDecimals && decimalPart !== undefined) {
    const limitedDecimal =
      decimalScale !== undefined
        ? decimalPart.slice(0, decimalScale)
        : decimalPart
    result = `${result}${decSep}${limitedDecimal}`
  } else if (fixedDecimals && decimalScale > 0) {
    result = `${result}${decSep}${'0'.repeat(decimalScale)}`
  }

  return isNegative ? `-${result}` : result
}

/**
 * Parses a formatted display string back to a standard JavaScript numeric string (e.g. '1000000.50').
 */
export function parseNumberValue(
  displayValue: string,
  options: NumberFormatOptions = {}
): string {
  if (!displayValue) return ''

  const {
    thousandSeparator = '.',
    decimalSeparator = ',',
    allowNegative = false,
  } = options

  const isNegative = allowNegative && displayValue.startsWith('-')

  // Remove all thousand separators
  let clean = displayValue
  if (thousandSeparator) {
    // Escape regex special chars
    const escapedThousand = thousandSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    clean = clean.replace(new RegExp(escapedThousand, 'g'), '')
  }

  // Convert custom decimalSeparator to standard dot '.'
  if (decimalSeparator && decimalSeparator !== '.') {
    clean = clean.replace(decimalSeparator, '.')
  }

  // Remove any remaining invalid characters (keep digits, standard dot, and leading minus)
  clean = clean.replace(/[^0-9.]/g, '')

  // Ensure only one dot exists
  const dotParts = clean.split('.')
  if (dotParts.length > 2) {
    clean = `${dotParts[0]}.${dotParts.slice(1).join('')}`
  }

  if (isNegative && clean && clean !== '0') {
    clean = `-${clean}`
  }

  return clean
}
