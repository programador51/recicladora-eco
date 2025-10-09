import React from 'react'
import Grid from '@mui/material/Grid'
import { Typography, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import ParkIcon from '@mui/icons-material/Park'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import BoltIcon from '@mui/icons-material/Bolt'
import CloudIcon from '@mui/icons-material/Cloud'

export default function AmbientImpact(): React.JSX.Element {
  const items = [
    {
      label: 'Árboles salvados',
      value: '1.61',
      icon: <ParkIcon sx={{ fontSize: 40, color: 'green' }} />
    },
    {
      label: 'Litros de agua ahorrados',
      value: '5,000',
      icon: <WaterDropIcon sx={{ fontSize: 40, color: 'blue' }} />
    },
    {
      label: 'Energía ahorrada (kWh)',
      value: '3,000',
      icon: <BoltIcon sx={{ fontSize: 40, color: 'yellow' }} />
    },
    {
      label: 'Emisiones de CO2 evitadas (kg)',
      value: '2,500',
      icon: <CloudIcon sx={{ fontSize: 40, color: 'gray' }} />
    }
  ]

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Impacto ambiental
        </Typography>
      </Grid>

      <Grid size={12}>
        <Card sx={{ padding: '20px' }}>
          <Stack flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={2}>
            <Typography fontWeight={'bold'}>Tu impacto</Typography>

            {items.map((item) => (
              <Stack
                key={item.label}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={2}
              >
                {/* <ParkIcon sx={{ fontSize: 100, color: 'green' }} /> */}
                {item.icon}
                <Stack flexDirection={'row'} gap={1}>
                  <Typography textAlign={'center'}>{item.label}:</Typography>
                  <Typography fontWeight={'bold'}>{item.value}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}
