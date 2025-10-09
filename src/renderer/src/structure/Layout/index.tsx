import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Nav from '../Nav'

export default function Layout({ children }: { children: React.JSX.Element }): React.JSX.Element {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid padding="20px 0 20px 0" size={2} component={'aside'} position={'sticky'} top={0}>
          <Nav />
        </Grid>
        <Grid size={10} padding={'20px'}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}
