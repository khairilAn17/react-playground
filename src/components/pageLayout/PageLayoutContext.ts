import { createContext, useContext } from 'react'
import type { PageLayoutContextValue } from './types'

export const PageLayoutContext = createContext<PageLayoutContextValue>({
  maxWidth: 'lg',
  compact: false,
  loading: false,
})

export function usePageLayout(): PageLayoutContextValue {
  return useContext(PageLayoutContext)
}
