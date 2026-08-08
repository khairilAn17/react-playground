import { IconButton, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useSidebar } from './SidebarContext'

export interface SidebarToggleProps {
  /** Optional custom tooltip title */
  tooltipTitle?: string
}

export function SidebarToggle({ tooltipTitle }: SidebarToggleProps) {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar()

  const handleToggle = () => {
    // Toggle mobile drawer if on mobile view, otherwise toggle collapsed state
    if (window.innerWidth < 600) {
      setMobileOpen((prev) => !prev)
    } else {
      setCollapsed((prev) => !prev)
    }
  }

  const isOpen = !collapsed || mobileOpen
  const defaultTooltip = isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'

  return (
    <Tooltip title={tooltipTitle ?? defaultTooltip}>
      <IconButton onClick={handleToggle} color="inherit" aria-label="toggle sidebar">
        {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
    </Tooltip>
  )
}
