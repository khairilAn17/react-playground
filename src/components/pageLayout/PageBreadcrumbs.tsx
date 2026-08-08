import type { ReactNode } from 'react'
import { Breadcrumbs, Link, Typography, Box } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import type { BreadcrumbItem } from './types'

export interface PageBreadcrumbsProps {
  items?: BreadcrumbItem[]
  children?: ReactNode
}

export function PageBreadcrumbs({ items, children }: PageBreadcrumbsProps) {
  if (children) {
    return <Box sx={{ mb: 1 }}>{children}</Box>
  }

  if (!items || items.length === 0) return null

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb navigation"
      sx={{ mb: 1.5 }}
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
    </Breadcrumbs>
  )
}
