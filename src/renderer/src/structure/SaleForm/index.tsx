import React from 'react'
import { Stack, Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import WeightKgInput from '@renderer/molecules/WeightKgInput'
import MaterialSelect from '@renderer/molecules/MaterialSelect'
import SellerInput from '@renderer/molecules/SellerInput'
import ErrorMessageAtom from '@renderer/atoms/ErrorMessage'
import { SaleFormData } from './types'

// ✅ define the validation schema
const schema = yup.object({
  material: yup
    .number()
    .positive('El material no es válido')
    .min(1, 'El material no es válido')
    .required('El material es obligatorio')
    .typeError('El material es obligatorio'),
  weightKg: yup
    .number()
    .typeError('Debes ingresar un número válido')
    .positive('Debe ser mayor a 0.00kg')
    .required('El peso es obligatorio')
    .typeError('El peso es obligatorio'),
  seller: yup
    .number() 
    .min(1, 'El comprador no es valido')
    .positive('El comprador no es válido')
    .required('El comprador es obligatorio')
    .typeError('El comprador es obligatorio')
})

export default function SaleForm(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SaleFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      material: 0,
      weightKg: 0,
      seller: 0
    }
  })

  const onSubmit = async(data):Promise<void> => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <Stack
      component="form"
      flexDirection="column"
      gap={2}
      marginTop={1}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Material Select */}
      <Controller
        name="material"
        control={control}
        render={({ field }) => (
          <div>
            <MaterialSelect
              {...field}
              onChange={(value) => field.onChange(+value.id)}
              onlyAvailable={true}
            />
            <ErrorMessageAtom error={errors.material} />
          </div>
        )}
      />

      {/* Weight Input */}
      <Controller
        name="weightKg"
        control={control}
        render={({ field }) => (
          <div>
            <WeightKgInput {...field} onChange={(value) => field.onChange(value)} />
            <ErrorMessageAtom error={errors.weightKg} />
          </div>
        )}
      />

      {/* Seller Input */}
      <Controller
        name="seller"
        control={control}
        render={({ field }) => (
          <div>
            <SellerInput
              {...field}
              onChange={(value) => field.onChange(+(value.target.value as string))}
            />
            <ErrorMessageAtom error={errors.seller} />
          </div>
        )}
      />

      <Button type="submit" fullWidth variant="contained">
        Confirmar venta
      </Button>
    </Stack>
  )
}
