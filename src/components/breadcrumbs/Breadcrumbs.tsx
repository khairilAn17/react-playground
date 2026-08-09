import type { ReactNode } from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material'
import type { BreadcrumbsProps as MuiBreadcrumbsProps, SxProps, Theme } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface BreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'children'> {
  items?: BreadcrumbItem[]
  children?: ReactNode
  separator?: ReactNode
  sx?: SxProps<Theme>
}

/**
 * Breadcrumbs
 *
 * Standalone, type-safe breadcrumb navigation component using MUI Breadcrumbs and Link.
 * Supports icon items, custom separators, responsive styling, and extends standard MUI `BreadcrumbsProps`.
 *
 * @example
 * <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]} />
 */
export function Breadcrumbs({
  items,
  children,
  separator = <NavigateNextIcon fontSize="small" />,
  sx,
  ...otherProps
}: BreadcrumbsProps) {
  if (children) {
    return <Box sx={{ mb: 1, ...sx }}>{children}</Box>
  }

  if (!items || items.length === 0) return null

  return (
    <MuiBreadcrumbs
      separator={separator}
      aria-label="breadcrumb navigation"
      sx={{ mb: 1.5, ...sx }}
      {...otherProps}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        if (isLast || !item.href) {
          return (
            <Typography
              key={`bc-${index}-${item.label}`}
              variant="caption"
              color="text.primary"
              sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {item.icon}
              {item.label}
            </Typography>
          )
        }
        return (
          <Link
            key={`bc-${index}-${item.label}`}
            underline="hover"
            color="text.secondary"
            href={item.href}
            variant="caption"
            sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}
