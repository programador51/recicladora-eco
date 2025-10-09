import React from 'react'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import MaterialManagementItem from '@renderer/molecules/MaterialManagementItem'
import { PropsDetailMaterial } from '@renderer/molecules/CurrentCapacityMaterial/types'
import CurrentCapacityMaterial from '@renderer/molecules/CurrentCapacityMaterial'
import { PropsMaterialManagementItem } from '@renderer/molecules/MaterialManagementItem/types'

export default function MagamentMaterial(): React.JSX.Element {
  const items:PropsMaterialManagementItem[] = [
    { material: 'Cartón', demanda: 'alta', calidad: 'media' },
    { material: 'PET', demanda: 'alta', calidad: 'alta' },
    { material: 'Aluminio', demanda: 'media', calidad: 'alta' },
    { material: 'Vidrio', demanda: 'media', calidad: 'media' },
    { material: 'Cobre', demanda: 'alta', calidad: 'alta' },
    { material: 'Papel', demanda: 'baja', calidad: 'media' },
    { material: 'Acero', demanda: 'media', calidad: 'alta' },
    { material: 'Plástico duro', demanda: 'media', calidad: 'baja' },
    { material: 'Textiles', demanda: 'baja', calidad: 'media' },
    { material: 'Tetra Pak', demanda: 'baja', calidad: 'baja' }
  ]

  const itemsManag: PropsDetailMaterial[] = [
    { material: 'Carton', kg: 10, m: 0.02 },
    { material: 'PET', kg: 8, m: 0.015 },
    { material: 'Aluminio', kg: 5, m: 0.01 },
    { material: 'Vidrio', kg: 12, m: 0.03 },
    { material: 'Plastico HDPE', kg: 7, m: 0.02 },
    // { material: 'Plastico LDPE', kg: 4, m: 0.01 },
    // { material: 'Acero', kg: 6, m: 0.015 },
    // { material: 'Papel', kg: 4, m: 0.01 }
  ]

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Gestión de materiales
        </Typography>
      </Grid>

      <Grid padding="20px 0 20px 0" size={6}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography fontWeight={'bold'}>Catálogo de materiales</Typography>

          {items.map((item) => (
            <MaterialManagementItem
              key={item.material}
              material={item.material}
              calidad={item.calidad}
              demanda={item.demanda}
            />
          ))}
        </Card>
      </Grid>

      <Grid padding="20px 0 20px 0" size={6}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography fontWeight={'bold'} marginBottom={2}>
            Capacidad de almacén
          </Typography>

          <Typography fontWeight={'bold'}>Total almacenado</Typography>
          <Typography>Kilos: 56.00 kg.</Typography>
          <Typography>
            Volumen: 0.13 m<sup>3</sup>{' '}
          </Typography>

          <Typography fontWeight={'bold'} marginTop={2}>
            Capacidad restante
          </Typography>
          <Typography>Kilos: 199,444 kg.</Typography>
          <Typography>
            Volumen: 499.87 m<sup>3</sup>{' '}
          </Typography>

          <Typography fontWeight={'bold'} marginTop={2}>
            Detalle por material
          </Typography>

          {itemsManag.map((item) => (
            <CurrentCapacityMaterial
              key={item.material}
              material={item.material}
              kg={item.kg}
              m={item.m}
            />
          ))}
        </Card>
      </Grid>
    </Grid>
  )
}
