import React from 'react'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import CurrentCapacityMaterial from '@renderer/molecules/CurrentCapacityMaterial'
import useManagmentMaterial from '@renderer/customHooks/useManagmentMaterial'

export default function MagamentMaterial(): React.JSX.Element {
  const hook = useManagmentMaterial()
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Gestión de materiales
        </Typography>
      </Grid>

      <Grid padding="20px 0 20px 0" size={6}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography marginBottom={2} fontWeight={'bold'}>Catálogo y detalle de materiales</Typography>


          <Typography marginBottom={2}>
            Disponibilidad del material por tipo y la cantidad existente
          </Typography>

          {hook.materials.map((item, i) => (
            <CurrentCapacityMaterial
              key={`material_${i}`}
              material={item.nombre_material}
              kg={item.total_kilos}
              m={item.total_volumen_m3}
            />
          ))}
        </Card>
      </Grid>

      <Grid padding="20px 0 20px 0" size={6}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography fontWeight={'bold'} marginBottom={2}>
            Capacidad de almacén
          </Typography>

          <Typography marginBottom={2}>
            Espacio disponible para recibir más material dentro del almacen segun el espacio libre.
            Este es liberado con cada envio de material a los compradores/clientes
          </Typography>

          <Typography fontWeight={'bold'}>Total almacenado</Typography>
          <Typography>Kilos: {hook.totalKg} kg.</Typography>
          <Typography>
            Volumen: {hook.totalVol} m<sup>3</sup>
          </Typography>

          <Typography fontWeight={'bold'} marginTop={2}>
            Capacidad restante
          </Typography>
          <Typography>Kilos: {hook.remaingKg} kg.</Typography>
          <Typography>
            Volumen: {hook.remaingVol} m<sup>3</sup>
          </Typography>

          {/* <Typography fontWeight={'bold'} marginTop={2}>
            Detalle por material
          </Typography>

          {itemsManag.map((item) => (
            <CurrentCapacityMaterial
              key={item.material}
              material={item.material}
              kg={item.kg}
              m={item.m}
            />
          ))} */}
        </Card>
      </Grid>
    </Grid>
  )
}
