import type { Meta, StoryObj } from '@storybook/react'
import { Button, Chip, Typography, Card, CardContent } from '@mui/material'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'

import { PageLayout } from './PageLayout'

const meta: Meta<typeof PageLayout> = {
  title: 'Components/Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageLayout>

export const StandardPage: Story = {
  render: () => (
    <PageLayout maxWidth="lg">
      <PageLayout.Header
        title="Team Directory"
        subtitle="Manage workspace members and permission roles"
        breadcrumbs={[{ label: 'Workspace', href: '/' }, { label: 'Team' }]}
        status={<Chip label="42 Active Members" size="small" color="primary" />}
        actions={
          <>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<AddIcon />}>
              Invite Member
            </Button>
          </>
        }
      />
      <PageLayout.Content>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Engineers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  24 Active Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Designers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  10 Active Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Product Managers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  8 Active Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <PageLayout.Section title="Role Permissions Policy" description="Configure default access for new invites">
          <Typography variant="body2" color="text.secondary">
            New members join with standard developer access by default.
          </Typography>
        </PageLayout.Section>
      </PageLayout.Content>
    </PageLayout>
  ),
}

export const FormViewWithStickyFooter: Story = {
  render: () => (
    <PageLayout maxWidth="sm">
      <PageLayout.Header
        title="Account Preferences"
        subtitle="Update your username, email, and security rules"
        onBack={() => alert('Going back')}
      />
      <PageLayout.Content>
        <PageLayout.Section title="General Profile">
          <Typography variant="body2" color="text.secondary">
            Profile details form content goes here.
          </Typography>
        </PageLayout.Section>

        <PageLayout.StickyFooter>
          <Button variant="outlined">Reset</Button>
          <Button variant="contained">Save Preferences</Button>
        </PageLayout.StickyFooter>
      </PageLayout.Content>
    </PageLayout>
  ),
}

export const LoadingState: Story = {
  render: () => <PageLayout loading maxWidth="lg">{null}</PageLayout>,
}
