import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Typography, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import WarehouseItem from '@renderer/atoms/WarehouseItem'
import useManagmentMaterial from '@renderer/customHooks/useManagmentMaterial'
import useSells from '@renderer/customHooks/useSells'
import PendingLotsForm from '../PendingLotsForm'

export default function Logistic(): React.JSX.Element {
  const hook = useManagmentMaterial()
  const sells = useSells()

  useEffect(() => {
    sells.getSells()
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Gestión de envíos y logística
        </Typography>
      </Grid>

      <Grid minHeight={'200px'} size={6}>
        <Card sx={{ padding: '10px 20px', height: '100%' }}>
          <Typography fontWeight={'bold'} marginBottom={2}>
            Resumen de almacén
          </Typography>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Capacidad total (Peso): </Typography>
            <Typography fontWeight={'bold'}>1,000 kg</Typography>
          </Stack>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Capacidad total (Volumen): </Typography>
            <Typography fontWeight={'bold'}>10 m3</Typography>
          </Stack>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Almacenado actualmente: </Typography>
            <Typography fontWeight={'bold'}>
              {hook.totalKg} kg / {hook.totalVol} m3
            </Typography>
          </Stack>

          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Capacidad restante</Typography>
            <Typography fontWeight={'bold'}>
              {hook.remaingKg} kg / {hook.remaingVol} m3
            </Typography>
          </Stack>

          {sells.pendingToSend.map((item, i) => (
            <WarehouseItem
              key={`pendingToSell_${i}`}
              kg={item.kilos_vendidos}
              material={item.nombre_material}
              volumen={0}
            />
          ))}

          {/* </WarehouseItem> */}
        </Card>
      </Grid>
      <Grid minHeight={'200px'} size={6}>
        <Card sx={{ padding: '10px 20px', height: '100%' }}>
          <Typography fontWeight={'bold'} marginBottom={2}>
            Planificar envíos
          </Typography>

          <Typography>Fecha de salida</Typography>
          <input type="date" name="" id="" max={new Date().toISOString().split('T')[0]} />

          <Typography fontWeight={'bold'} marginTop={2}>
            Lotes pendientes de envío
          </Typography>

          <PendingLotsForm/>

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

          <Typography variant="caption" fontStyle={'italic'} color="textDisabled">
            Cálculo basado en una velocidad promedio de 60km/h.
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}
