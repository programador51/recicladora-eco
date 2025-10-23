import React from 'react'
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
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import Chip from '@mui/material/Chip'
import SaleForm from '../SaleForm'

function createData(
  name: string,
  kg: number,
  buyer: string,
  date: string,
  status: string
): {
  name: string
  kg: number
  buyer: string
  date: string
  status: string
} {
  return { name, kg, buyer, date, status }
}

const rows = [
  createData('Plástico PET', 120, 'PlastiCycle MX', '2025-10-02', 'Completado'),
  createData('Cartón Corrugado', 340, 'EcoPapel Logistics', '2025-10-05', 'Pendiente'),
  createData('Vidrio Verde', 280, 'VidrioCircular', '2025-10-07', 'Pendiente'),
  createData('Cobre Recuperado', 75, 'MetaRecicla', '2025-10-08', 'Completado'),
  createData('Aluminio Compactado', 190, 'AlumEco Traders', '2025-10-03', 'Pendiente'),
  createData('Papel Blanco', 410, 'PapelRenova', '2025-10-06', 'Cancelado'),
  createData('Plástico HDPE', 260, 'CircularPlast Co.', '2025-10-04', 'Completado'),
  createData('Chatarra Mixta', 520, 'CobreClave S.A.', '2025-10-01', 'Pendiente'),
  createData('Electrónicos RAEE', 95, 'ReTech Solutions MX', '2025-10-09', 'Pendiente'),
  createData('Botellas Transparentes', 145, 'EcoPlast Compras', '2025-10-02', 'Completado')
]

export default function Sells(): React.JSX.Element {

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
          <SaleForm/>

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
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Estado de entrega</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.kg} kg.</TableCell>
                  <TableCell align="left">{row.buyer}</TableCell>
                  <TableCell align="center">
                    {new Intl.DateTimeFormat('es-MX', {
                      dateStyle: 'medium'
                    }).format(new Date(row.date))}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      color={row.status === 'Completado' ? 'success' : 'warning'}
                      label={row.status}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {row.status === 'Completado' ? (
                      <CheckIcon color="success" />
                    ) : (
                      <LocalShippingIcon color="info" />
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
