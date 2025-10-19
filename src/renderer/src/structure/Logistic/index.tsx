import React from 'react'
import Grid from '@mui/material/Grid'
import { Typography, Stack, Button } from '@mui/material'
import Card from '@mui/material/Card'
import WarehouseItem from '@renderer/atoms/WarehouseItem'

export default function Logistic(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Gestión de envíos y logística
        </Typography>
      </Grid>

      <Grid minHeight={'200px'} size={6}>
        <Card sx={{ padding: '10px 20px', height:'100%' }}>
          <Typography fontWeight={'bold'} marginBottom={2}>
            Resumen de almacén
          </Typography>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Capacidad total (Peso): </Typography>
            <Typography fontWeight={'bold'}>20,000 kg</Typography>
          </Stack>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Capacidad total (Volumen): </Typography>
            <Typography fontWeight={'bold'}>500 m3</Typography>
          </Stack>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Almacenado actualmente: </Typography>
            <Typography fontWeight={'bold'}>1,400.00 kg / 28.00 m3</Typography>
          </Stack>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Capacidad restante</Typography>
            <Typography fontWeight={'bold'}>18,600 kg / 472.00 m3</Typography>
          </Stack>

          <WarehouseItem kg={1400} material='PET' volumen={28}>
            
          </WarehouseItem>
        </Card>
      </Grid>
      <Grid minHeight={'200px'} size={6}>
        <Card sx={{ padding: '10px 20px', height:'100%' }}>
          <Typography fontWeight={'bold'} marginBottom={2}>
            Planificar envíos
          </Typography>

          <Typography>Fecha de salida</Typography>
          <input type="date" name="" id="" max={new Date().toISOString().split('T')[0]} />

          <Typography fontWeight={'bold'} marginTop={2}>
            Lotes pendientes de envío
          </Typography>

          <Button variant="contained" fullWidth>
            Calcular y enviar
          </Button>

          <Typography fontWeight={'bold'} marginBottom={1}>
            Resumen del envío:
          </Typography>

          <Stack flexDirection={'row'} gap={1}>
            <Typography>Número de viajes necesarios:</Typography>
            <Typography fontWeight={'bold'}>1 </Typography>
          </Stack>

          <Stack flexDirection={'row'} gap={1}>
            <Typography>Fecha y hora de finalización:</Typography>
            <Typography fontWeight={'bold'}>31/08/2025, 6:30pm</Typography>
          </Stack>

          <Typography variant='caption' fontStyle={'italic'} color='textDisabled'>Cálculo basado en una velocidad promedio de 60km/h.</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}
