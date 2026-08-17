import type { SxProps, Theme } from '@mui/material'

/** The scalar (non-array) element type accepted inside an MUI sx array. */
type SxItem = Exclude<SxProps<Theme>, ReadonlyArray<unknown>>

/**
 * Normalises any SxProps value into a flat array of scalar sx items,
 * safe for spreading inside an MUI `sx={[...]}` array prop.
 */
export const toSxArray = (sx?: SxProps<Theme>): SxItem[] => {
  if (sx == null) return []
  if (Array.isArray(sx)) return (sx as ReadonlyArray<SxItem>).slice()
  return [sx as SxItem]
}
