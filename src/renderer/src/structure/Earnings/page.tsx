import { Typography, Button, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import EarningItem from '@renderer/atoms/EarningItem'
import MaterialSelect from '@renderer/molecules/MaterialSelect'
import WeightKgInput from '@renderer/molecules/WeightKgInput'

export default function Earnings(): React.JSX.Element {
  const items = [
    { material: 'Plástico PET', earning: 80 },
    { material: 'Plástico HDPE', earning: 60 },
    { material: 'Plástico PVC', earning: 40 },
    { material: 'Plástico LDPE', earning: 30 },
    { material: 'Plástico PP', earning: 50 },
    { material: 'Plástico PS', earning: 20 },
    { material: 'Otros plásticos', earning: 10 }
  ]

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={'bold'} variant="h5">
          Registro y Ganancias
        </Typography>
      </Grid>

      <Grid padding="20px 0 20px 0" size={6}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography fontWeight={'bold'}>Ganancias actuales (por kg)</Typography>

          {items.map((item) => (
            <EarningItem key={item.material} earning={item.earning} material={item.material} />
          ))}
        </Card>
      </Grid>

      <Grid padding="20px 0 20px 0" size={6}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography marginBottom={1} fontWeight={'bold'}>
            Registrar y calcular
          </Typography>

          <Stack component={'form'} flexDirection={'column'} gap={2}>
            <MaterialSelect />
            <WeightKgInput />
            <Button variant="contained" color="primary" fullWidth>
              Registrar material
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}
