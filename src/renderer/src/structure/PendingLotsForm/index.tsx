import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Button, Typography } from '@mui/material'
import PendingLot from '../PendingLot'
import useSells from '@renderer/customHooks/useSells'
import ErrorMessageAtom from '@renderer/atoms/ErrorMessage'
import Swal from 'sweetalert2'

// ✅ Esquema de validación
const schema = yup.object({
  checkedLots: yup
    .array()
    .of(yup.boolean().required('Debes indicar si el lote está seleccionado').default(false))
    .min(1, 'Selecciona al menos un lote')
    .required('Debes seleccionar al menos un elemento')
})

// ✅ Tipo explícito alineado con Yup
type FormValues = {
  checkedLots: boolean[]
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
      checkedLots: sells.pendingToSend.map(() => false)
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
        fecha_salida: new Date().toISOString()
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
