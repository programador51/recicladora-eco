import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'

export default function Sells(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Venta de materiales
        </Typography>
      </Grid>

      <Grid padding="20px 0 20px 0" size={12}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography fontWeight={'bold'}>Registrar venta</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}
