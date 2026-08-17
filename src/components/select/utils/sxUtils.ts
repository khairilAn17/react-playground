import type { SxProps, Theme } from '@mui/material'

/** The scalar (non-array) element type accepted inside an MUI sx array. */
type SxItem = Exclude<SxProps<Theme>, ReadonlyArray<unknown>>

/**
 * Normalises any SxProps value into a flat array of scalar sx items,
 * safe for spreading inside an MUI `sx={[...]}` array prop.
 *
 * @param sx - Any valid MUI `SxProps<Theme>` value.
 * @returns A flat `SxItem[]` ready to spread into an `sx={[...]}` array.
 *
 * @example
 * // undefined → empty array
 * toSxArray(undefined)
 * // → []
 *
 * @example
 * // Single style object → wrapped in array
 * toSxArray({ color: 'red', fontWeight: 700 })
 * // → [{ color: 'red', fontWeight: 700 }]
 *
 * @example
 * // Theme function → wrapped in array
 * toSxArray((theme) => ({ color: theme.palette.primary.main }))
 * // → [(theme) => ({ color: theme.palette.primary.main })]
 *
 * @example
 * // Already an array → returned as a flat copy
 * toSxArray([{ mt: 1 }, { mb: 2 }])
 * // → [{ mt: 1 }, { mb: 2 }]
 *
 * @example
 * // Typical usage — merge base styles with user-provided overrides:
 * sx={[
 *   { p: 1.5, bgcolor: 'background.paper' },
 *   ...toSxArray(menuPaperSx),
 *   ...toSxArray(slotSx?.menuPaper),
 * ]}
 */
export const toSxArray = (sx?: SxProps<Theme>): SxItem[] => {
  if (sx == null) return []
  if (Array.isArray(sx)) return (sx as ReadonlyArray<SxItem>).slice()
  return [sx as SxItem]
}
