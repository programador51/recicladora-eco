import { SelectProps, SelectChangeEvent } from '@mui/material'

export interface PropsSellerInput
  extends Omit<SelectProps<string | number>, 'onChange' | 'value' | 'variant'> {
  value?: number | string
  onChange?: (event: SelectChangeEvent<number | string>) => void
  idMaterial?: number
  variant?: 'outlined' // ✅ constrain to match your design
}
