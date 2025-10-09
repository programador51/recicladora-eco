import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import { cyan } from '@mui/material/colors'
import Earnings from './structure/Earnings/page'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid padding="20px 0 20px 0" size={2} component={'aside'}>
          <Typography
            margin={'0 0 20px 0'}
            variant="h6"
            sx={{ color: cyan[50] }}
            textAlign={'center'}
            fontWeight={'bold'}
          >
            Dashboard
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ color: cyan[50], borderRadius: '0px' }}
            onClick={ipcHandle}
          >
            Ganancias
          </Button>

          <Button fullWidth variant="text" sx={{ color: cyan[50] }} onClick={ipcHandle}>
            Gestion
          </Button>

          <Button fullWidth variant="text" sx={{ color: cyan[50] }} onClick={ipcHandle}>
            Venta
          </Button>
          <Button fullWidth variant="text" sx={{ color: cyan[50] }} onClick={ipcHandle}>
            Impacto
          </Button>
          <Button fullWidth variant="text" sx={{ color: cyan[50] }} onClick={ipcHandle}>
            Reportes
          </Button>
          <Button fullWidth variant="text" sx={{ color: cyan[50] }} onClick={ipcHandle}>
            Gamificación
          </Button>
          <Button fullWidth variant="text" sx={{ color: cyan[50] }} onClick={ipcHandle}>
            Logística
          </Button>
        </Grid>
        <Grid size={10} padding={'20px'}>
          <Earnings />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
