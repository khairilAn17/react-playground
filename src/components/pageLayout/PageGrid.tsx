import type { ReactNode } from 'react'
import React from 'react'
import Grid from '@mui/material/Grid'

export type GridColumnSize = number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }

/**
 * Semantic column count shorthand. Maps to 12-column grid breakpoints:
 *
 * | cols | xs | sm  | md  | Description       |
 * |------|----|-----|-----|-------------------|
 * | 1    | 12 | 12  | 12  | Full-width        |
 * | 2    | 12 |  6  |  6  | Two-column        |
 * | 3    | 12 |  6  |  4  | Three-column      |
 * | 4    | 12 |  6  |  3  | Four-column       |
 * | 6    | 12 |  4  |  2  | Six-column        |
 */
const COLS_PRESETS: Record<number, GridColumnSize> = {
  1: { xs: 12, sm: 12, md: 12 },
  2: { xs: 12, sm: 6,  md: 6  },
  3: { xs: 12, sm: 6,  md: 4  },
  4: { xs: 12, sm: 6,  md: 3  },
  6: { xs: 12, sm: 4,  md: 2  },
}

export interface PageGridProps {
  /**
   * Semantic column count shorthand: 1 | 2 | 3 | 4 | 6.
   * Automatically maps to responsive 12-column breakpoints.
   * Ignored when `columns` is also set.
   *
   * @example <PageLayout.Grid cols={3}> // 3-column responsive grid
   */
  cols?: 1 | 2 | 3 | 4 | 6
  /**
   * Explicit MUI Grid2 column span per child (overrides `cols`).
   * @example columns={{ xs: 12, sm: 6, md: 4 }}
   */
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

export function PageGrid({
  cols,
  columns,
  spacing = 2.5,
  children,
}: PageGridProps) {
  // cols shorthand takes lower priority than explicit columns
  const resolvedColumns: GridColumnSize =
    columns ?? (cols !== undefined ? COLS_PRESETS[cols] : { xs: 12, md: 6 })

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
          <Grid key={`grid-item-${index}`} size={resolvedColumns}>
            {child}
          </Grid>
        )
      })}
    </Grid>
  )
}

PageGrid.Item = PageGridItem

