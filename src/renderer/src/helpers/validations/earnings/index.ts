import { Pureza } from '@renderer/molecules/QualityMaterialInput'
import * as Yup from 'yup'

export interface MaterialForm {
  id_material: number
  pureza: Pureza
  kilos_almacenados: number
  volumen_almacenado_m3: number
}

export const materialSchema = Yup.object({
  id_material: Yup.number()
    .typeError('Debe ser un número')
    .required('El material es obligatorio')
    .positive('Debe ser mayor a 0'),

  pureza: Yup.mixed<Pureza>()
    .oneOf(['alta', 'media', 'baja'], 'Pureza inválida')
    .required('La pureza es obligatoria'),

  kilos_almacenados: Yup.number()
    .typeError('Debe ser un número')
    .required('El peso en kg es obligatorio')
    .positive('El peso debe ser mayor a 0'),

  volumen_almacenado_m3: Yup.number()
    .typeError('Debe ser un número')
    .required('El volumen en m³ es obligatorio')
    .positive('El volumen debe ser mayor a 0')
})
