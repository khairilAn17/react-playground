import { Box, Skeleton, Card, CardContent } from '@mui/material'

export function PageSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header Skeleton */}
      <Box>
        <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={280} height={40} />
        <Skeleton variant="text" width={380} height={24} sx={{ mt: 0.5 }} />
      </Box>

      {/* Content Skeleton */}
      <Card variant="outlined">
        <CardContent>
          <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 1.5, mb: 2 }} />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="60%" />
        </CardContent>
      </Card>
    </Box>
  )
}
