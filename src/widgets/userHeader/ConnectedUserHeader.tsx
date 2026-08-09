import { UserHeader } from './UserHeader'
import { useCurrentUser } from './useCurrentUser'
import type { UserHeaderProps } from './types'

export interface ConnectedUserHeaderProps extends Partial<UserHeaderProps> {}

/**
 * ConnectedUserHeader
 *
 * A self-hydrating UserHeader widget that automatically connects to user profile & notification state
 * via `useCurrentUser()`. Requires zero props at the call site while still accepting optional prop overrides.
 *
 * @example
 * <ConnectedUserHeader />
 */
export function ConnectedUserHeader(props: ConnectedUserHeaderProps) {
  const {
    user,
    notifications,
    unreadCount,
    loading,
    handleSearch,
    handleLogout,
    handleProfileClick,
    handleSettingsClick,
  } = useCurrentUser()

  return (
    <UserHeader
      user={props.user ?? user}
      loading={props.loading ?? loading}
      unreadCount={props.unreadCount ?? unreadCount}
      notifications={props.notifications ?? notifications}
      onSearch={props.onSearch ?? handleSearch}
      onLogout={props.onLogout ?? handleLogout}
      onProfileClick={props.onProfileClick ?? handleProfileClick}
      onSettingsClick={props.onSettingsClick ?? handleSettingsClick}
      searchPlaceholder={props.searchPlaceholder}
      extraActions={props.extraActions}
    />
  )
}
