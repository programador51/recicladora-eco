import React, { Fragment, useEffect, useMemo } from 'react'
import Layout from '../Layout'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Grid, Typography } from '@mui/material'
import useEarnings from '@renderer/customHooks/useEarnings'
import useSells from '@renderer/customHooks/useSells'

export default function Reports(): React.JSX.Element {
  const hook = useEarnings()
  const sells = useSells()

  useEffect(() => {
    sells.getSells()
  }, [])

  // Group by material and sum earnings
  const groupedData = useMemo(() => {
    const map = new Map<string, number>()
    hook.items.forEach((item) => {
      if (item.earning > 0) {
        map.set(item.material, (map.get(item.material) || 0) + item.earning)
      }
    })
    return Array.from(map, ([material, earning]) => ({ material, earning }))
  }, [hook.items])

  // Agrupar las ventas por id_material y sumar ganancia
  const groupedSells = useMemo(() => {
    const map = new Map<number, { nombre_material: string; ganancia: number }>()

    sells.sells.forEach((item) => {
      const revenue = item.kilos_vendidos * item.precio_kg // calcula la ganancia si no está
      const existing = map.get(item.id_material)
      if (existing) {
        existing.ganancia += revenue
      } else {
        map.set(item.id_material, {
          nombre_material: item.nombre_material,
          ganancia: revenue
        })
      }
    })

    return Array.from(map.values())
  }, [sells.sells])

  return (
    <Layout>
      <Fragment>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Typography fontWeight={'bold'} variant="h5">
              Reportes
            </Typography>
          </Grid>

          {/* {JSON.stringify(sells.sells)} */}

          <Grid padding="20px 0 20px 0" size={6}>
            <BarChart width={`100%`} height={300} data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="material" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earning" fill="#4a90e2" />
            </BarChart>

            <Typography textAlign={'center'} variant="body2">
              Pronostico de ganancias esperado por la empresa por cada registro de entrada de
              material
            </Typography>
          </Grid>

          <Grid padding="20px 0 20px 0" size={6}>
            <BarChart width={`100%`} height={300} data={groupedSells}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre_material" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ganancia" fill="#4a90e2" />
            </BarChart>

            <Typography textAlign={'center'} variant="body2">
              Ganancias reales obtenidas por la empresa por cada registro de venta (kg vendido x precio de compra del vendedor)
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    </Layout>
  )
}
