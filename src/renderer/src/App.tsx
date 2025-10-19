import Layout from './structure/Layout'
import { Typography, Stack } from '@mui/material'
import fime from '../src/fime.jpg'
import uanl from '../src/uanl.png'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const rows = [
  {
    matricula: '1731168',
    nombre: 'José Luis Pérez Olguín'
  }
]

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  // ipcHandle()

  return (
    <Layout>
      <Stack alignItems={'center'}>
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          gap={4}
          style={{
            marginBottom: '70px'
          }}
        >
          <img height={'70px'} src={fime} alt="FIME" />

          <div style={{ margin: 0 }}>
            <Typography textAlign={'center'} margin={0}>
              Universidad Autónoma de Nuevo León
            </Typography>
            <Typography textAlign={'center'} margin={0}>
              Facultad de ingeniería Mecánica y Eléctrica
            </Typography>
          </div>
          <img height={'70px'} src={uanl} alt="UANL" />
        </Stack>
        <Typography textAlign={'center'}>Diseño y especificación de software</Typography>
        <Typography variant="body2" fontStyle={'italic'} color="textSecondary" textAlign={'center'}>
          Agosto - Diciembre 2025
        </Typography>

        <TableContainer>
          <Table
            sx={{ width: '50%', justifyContent: 'center', margin: '40px 25%' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Matricula</TableCell>
                <TableCell align="center">Carrera</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.matricula}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="center">{row.matricula}</TableCell>
                  <TableCell align="center">IAS</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Grupo:</Typography>
          <Typography>008</Typography>
        </Stack>
        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Hora:</Typography>
          <Typography>Jueves N4-N6</Typography>
        </Stack>

        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Salón:</Typography>
          <Typography>3206</Typography>
        </Stack>

        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Catedrático:</Typography>
          <Typography>M.C. Jorge Alejandro Lozano González</Typography>
        </Stack>

        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Equipo:</Typography>
          <Typography>#1</Typography>
        </Stack>

        <Typography style={{ margin: '150px 0 0 0' }}>
          Ciudad Universitaria, San Nicolás de los Garza, Nuevo León
        </Typography>
      </Stack>
    </Layout>
  )
}

export default App
