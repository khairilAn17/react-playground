import { Stack } from '@mui/material'
import { ExpandableSearch } from '../../components/search'
import { NotificationMenu } from './NotificationMenu'
import { UserProfilePill } from './UserProfilePill'
import type { UserHeaderProps } from './types'

/**
 * UserHeader
 *
 * A composite domain-aware header actions widget that combines expandable search,
 * interactive notification Popover, and user profile pill with dropdown Menu.
 *
 * Placed inside `<PageLayout.Header actions={<UserHeader ... />} />` or any AppShell toolbar.
 *
 * @example
 * <UserHeader
 *   user={{ name: 'Shafa Riani', role: 'Maker' }}
 *   unreadCount={3}
 *   onSearch={(q) => fetchResults(q)}
 *   onLogout={() => auth.logout()}
 * />
 */
export function UserHeader({
  user,
  loading = false,
  unreadCount = 2,
  notifications,
  searchPlaceholder = 'Cari transaksi, rekening, atau fitur',
  onSearch,
  onLogout,
  onProfileClick,
  onSettingsClick,
  extraActions,
}: UserHeaderProps) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <ExpandableSearch
        placeholder={searchPlaceholder}
        onSearch={onSearch}
        iconButtonSx={{
          bgcolor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #E2E8F0',
          '&:hover': { bgcolor: '#F8FAFC' },
          p: 1,
        }}
      />

      <NotificationMenu unreadCount={unreadCount} notifications={notifications} />

      <UserProfilePill
        user={user}
        loading={loading}
        onLogout={onLogout}
        onProfileClick={onProfileClick}
        onSettingsClick={onSettingsClick}
      />

      {extraActions}
    </Stack>
  )
}
