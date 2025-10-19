import { Earn } from '@renderer/atoms/EarningItem/types'
import { MaterialForm } from '@renderer/helpers/validations/earnings'
import { UseFormReturn } from 'react-hook-form'

export interface ReturnUseEarnings {
  items: Earn[]
  form: UseFormReturn<MaterialForm>;
  onSubmit: (data: MaterialForm) => void
}
