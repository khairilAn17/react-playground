import { useState, useEffect } from 'react'
import type { UserProfileData, NotificationItem } from './types'

export interface UseCurrentUserReturn {
  user: UserProfileData | undefined
  notifications: NotificationItem[]
  unreadCount: number
  loading: boolean
  handleSearch: (query: string) => void
  handleLogout: () => void
  handleProfileClick: () => void
  handleSettingsClick: () => void
}

const MOCK_USER: UserProfileData = {
  id: 'usr_01',
  name: 'Shafa Riani',
  role: 'Maker',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  email: 'shafa@byondbiznis.co.id',
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Persetujuan Payroll',
    message: 'Transaksi payroll Gaji Agustus membutuhkan persetujuan Anda.',
    time: '5 mnt yang lalu',
    read: false,
  },
  {
    id: '2',
    title: 'Transfer Berhasil',
    message: 'Transfer Rp 50.000.000 ke PT Jaya Abadi telah diproses.',
    time: '1 jam yang lalu',
    read: false,
  },
]

/**
 * Custom hook providing user profile & notification state for ConnectedUserHeader.
 * Easily swappable with React Query / SWR / Zustand store in production.
 */
export function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<UserProfileData | undefined>(undefined)
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simulate short network delay
    const timer = setTimeout(() => {
      setUser(MOCK_USER)
      setNotifications(MOCK_NOTIFICATIONS)
      setLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSearch = (query: string) => {
    console.log('[HeaderSearch]', query)
  }

  const handleLogout = () => {
    console.log('[UserAuth] Logout clicked')
  }

  const handleProfileClick = () => {
    console.log('[UserAuth] Navigating to profile')
  }

  const handleSettingsClick = () => {
    console.log('[UserAuth] Navigating to settings')
  }

  return {
    user,
    notifications,
    unreadCount,
    loading,
    handleSearch,
    handleLogout,
    handleProfileClick,
    handleSettingsClick,
  }
}
