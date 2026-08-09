import type { ReactNode } from 'react'

export interface UserProfileData {
  id?: string
  name: string
  role?: string
  avatarUrl?: string
  email?: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time?: string
  read?: boolean
}

export interface UserHeaderProps {
  /** User profile data fetched from API */
  user?: UserProfileData
  /** Loading state during API fetch */
  loading?: boolean
  /** Unread notification count */
  unreadCount?: number
  /** Notification items list for popover dropdown */
  notifications?: NotificationItem[]
  /** Custom placeholder for expandable search input */
  searchPlaceholder?: string
  /** Callback when search query is submitted */
  onSearch?: (query: string) => void
  /** Callback when user clicks logout */
  onLogout?: () => void
  /** Callback when user clicks profile in menu */
  onProfileClick?: () => void
  /** Callback when user clicks settings in menu */
  onSettingsClick?: () => void
  /** Additional custom actions or widgets */
  extraActions?: ReactNode
}
