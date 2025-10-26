import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CheckIcon from '@mui/icons-material/Check'
import Chip from '@mui/material/Chip'
import SaleForm from '../SaleForm'
import useSells from '@renderer/customHooks/useSells'
import CompleteSell from '../CompleteSell'

export default function Sells(): React.JSX.Element {
  const hook = useSells()

  useEffect(() => {
    hook.getSells()
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Venta de materiales
        </Typography>
      </Grid>

      <Grid padding="20px 0 0 0" size={12}>
        <Card sx={{ padding: '20px' }}>
          <Typography fontWeight={'bold'}>Registrar venta</Typography>
          <SaleForm />
        </Card>
      </Grid>

      <Grid size={12}>
        <TableContainer sx={{ maxHeight: '50vh' }} component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Material</TableCell>
                <TableCell align="center">Kilos</TableCell>
                <TableCell align="center">Comprador</TableCell>
                <TableCell align="center">Enviado</TableCell>
                <TableCell align="center">Estado de entrega</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hook.sells.map((row, i) => (
                <TableRow
                  key={`item_sell_${i}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nombre_material}
                  </TableCell>
                  <TableCell align="right">{row.kilos_vendidos} kg.</TableCell>
                  <TableCell align="left">{row.comprador}</TableCell>
                  <TableCell align="center">
                    {row.fecha_salida === null ? 'Pendiente de envío' : new Intl.DateTimeFormat('es-MX', {
                      dateStyle: 'medium'
                    }).format(new Date(row.fecha_salida))}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      color={row.entregado === 1 ? 'success' : 'warning'}
                      label={row.entregado === 1 ? 'Completado' : 'Pendiente'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {row.fecha_entrega !== null ? (
                      <CheckIcon color="success" />
                    ) : (

                      <CompleteSell idVenta={row.id_venta} sentDate={row.fecha_salida}/>

                      
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
