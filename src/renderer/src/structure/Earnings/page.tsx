import { Typography, Button, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import EarningItem from '@renderer/atoms/EarningItem'
import useEarnings from '@renderer/customHooks/useEarnings'
import { getAllErrorMessages } from '@renderer/helpers/validations/messages'
import MaterialSelect from '@renderer/molecules/MaterialSelect'
import { PurezaSelect } from '@renderer/molecules/QualityMaterialInput'
import VolumenInput from '@renderer/molecules/VolumenInput'
import WeightKgInput from '@renderer/molecules/WeightKgInput'
import Swal from 'sweetalert2'
import { Controller } from 'react-hook-form'

export default function Earnings(): React.JSX.Element {
  const hook = useEarnings()

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
          <Typography marginBottom={2}>
            Pronóstico de ganancias total estimadas acorde al material que se ha registrado a travez
            del tiempo
          </Typography>

          {hook.items.map((item) => (
            <EarningItem
              id={item.id}
              key={item.material}
              earning={item.earning}
              material={item.material}
            />
          ))}
        </Card>
      </Grid>

      <Grid padding="20px 0 20px 0" size={6}>
        <Card sx={{ padding: '10px 20px' }}>
          <Typography marginBottom={1} fontWeight={'bold'}>
            Registrar y calcular
          </Typography>

          <Stack
            onSubmit={hook.form.handleSubmit(
              (ok) => hook.onSubmit(ok),
              (e) =>
                Swal.fire({
                  title: 'Valida tus datos',
                  html: getAllErrorMessages(e),
                  icon: 'error'
                })
            )}
            component={'form'}
            flexDirection={'column'}
            gap={2}
          >
            <Controller
              control={hook.form.control}
              name="id_material"
              render={({ field: { onChange } }) => <MaterialSelect onChange={item=>onChange(item.id)} />}
            />

            <Controller
              control={hook.form.control}
              name="pureza"
              render={({ field: { onChange } }) => <PurezaSelect onChange={onChange} />}
            />

            
            <Controller
              control={hook.form.control}
              name="kilos_almacenados"
              render={({ field: { onChange } }) => <WeightKgInput onChange={onChange} />}
            />

            <Controller
              control={hook.form.control}
              name="volumen_almacenado_m3"
              render={({ field: { onChange } }) => <VolumenInput onChange={onChange} />}
            />
            
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar material
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}
