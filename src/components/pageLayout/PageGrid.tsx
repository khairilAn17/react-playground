import type { ReactNode } from 'react'
import React from 'react'
import Grid from '@mui/material/Grid'

export type GridColumnSize = number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }

export interface PageGridProps {
  columns?: GridColumnSize
  spacing?: number
  children: ReactNode
}

export interface PageGridItemProps {
  columns?: GridColumnSize
  size?: GridColumnSize
  children: ReactNode
}

export function PageGridItem({ columns, size, children }: PageGridItemProps) {
  const colSize = size ?? columns ?? 12
  return <Grid size={colSize}>{children}</Grid>
}

PageGridItem.displayName = 'PageGridItem'

export function PageGrid({ columns = { xs: 12, md: 6 }, spacing = 2.5, children }: PageGridProps) {
  const childrenArray = React.Children.toArray(children)

  return (
    <Grid container spacing={spacing}>
      {childrenArray.map((child, index) => {
        if (
          React.isValidElement(child) &&
          (child.type === PageGridItem || (child.type as { displayName?: string })?.displayName === 'PageGridItem')
        ) {
          return React.cloneElement(child, { key: child.key ?? `grid-item-${index}` })
        }
        return (
          <Grid key={`grid-item-${index}`} size={columns}>
            {child}
          </Grid>
        )
      })}
    </Grid>
  )
}

PageGrid.Item = PageGridItem
