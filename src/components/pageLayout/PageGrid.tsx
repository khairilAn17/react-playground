import type { ReactNode } from 'react'
import Grid from '@mui/material/Grid'

export interface PageGridProps {
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  spacing?: number
  children: ReactNode
}

export function PageGrid({ columns = { xs: 12, md: 6 }, spacing = 2.5, children }: PageGridProps) {
  return (
    <Grid container spacing={spacing}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <Grid key={`grid-item-${index}`} size={columns}>
              {child}
            </Grid>
          ))
        : <Grid size={columns}>{children}</Grid>}
    </Grid>
  )
}
