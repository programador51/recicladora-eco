import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Button, FormHelperText, Typography } from '@mui/material'
import PendingLot from '../PendingLot'
import useSells from '@renderer/customHooks/useSells'
import ErrorMessageAtom from '@renderer/atoms/ErrorMessage'
import Swal from 'sweetalert2'
import CalendarInput from '@renderer/atoms/Calendar'
import dayjs from 'dayjs'

// ✅ Esquema de validación
const schema = yup.object({
    date: yup
    .date()
    .typeError('Selecciona una fecha válida')
    .required('La fecha de salida es obligatoria'),
  checkedLots: yup
    .array()
    .of(yup.boolean().required('Debes indicar si el lote está seleccionado').default(false))
    .min(1, 'Selecciona al menos un lote')
    .required('Debes seleccionar al menos un elemento')
})

// ✅ Tipo explícito alineado con Yup
type FormValues = {
  checkedLots: boolean[];
  date:Date;
}

export default function PendingLotsForm(): React.JSX.Element {
  const sells = useSells()

  useEffect(() => {
    sells.getSells()
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      checkedLots: sells.pendingToSend.map(() => false),
      date: new Date(dayjs().add(1,'day').format('YYYY/MM/DD'))
    }
  })

  const onSubmit = (data: FormValues): void => {
    const selected = sells.pendingToSend.filter((_, i) => data.checkedLots[i])

    if (selected.length <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar al menos un lote para enviar.',
        icon: 'error'
      })

      return
    }

    selected.forEach((lot) => {
      const dto = {
        id_venta: lot.id_venta,
        fecha_salida: data.date.toISOString()
      }

      window.api.createLogisticSend(dto)
    })
    window.location.reload()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}
    >


<Controller
  name="date"
  control={control}
  defaultValue={dayjs().add(1, 'day').toDate()} // optional default
  render={({ field }) => (
    <CalendarInput
      label="Fecha de salida"
      value={dayjs(field.value)} // react-hook-form provides Date, convert to dayjs
      onChange={(date) => field.onChange(date?.toDate())}
      minDate={dayjs().add(1, 'day')}
      slotProps={{
        textField: {
          size: 'small',
          fullWidth: true,
          error: !!errors.date,
          helperText: errors.date?.message
        }
      }}
    />
  )}
/>
<FormHelperText>Fecha en que el pedido será enviado por logística</FormHelperText>


      {/* <CalendarInput
        label="Fecha de salida"
        minDate={dayjs().add(1, 'day')}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true
          }
        }}
      />
      <FormHelperText>Fecha en que el pedido sera enviado por logistica</FormHelperText> */}

      <Typography variant="h6" gutterBottom>
        Lotes pendientes
      </Typography>

      {sells.pendingToSend.map((item, i) => (
        <>
          <Controller
            key={`pending_lot_${i}`}
            name={`checkedLots.${i}` as const}
            control={control}
            render={({ field }) => (
              <PendingLot
                label={`${item.nombre_material} | ${item.kilos_vendidos} kg. | ${item.comprador}`}
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {errors.checkedLots && <ErrorMessageAtom error={errors.checkedLots[i]} />}
        </>
      ))}

      <Button type="submit" variant="contained" color="primary">
        Enviar seleccionados
      </Button>
    </Box>
  )
}
