import * as React from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'

export interface CalendarInputProps
  extends Omit<
    DatePickerProps<true>, // 👈 explicitly specify the two generics
    'value' | 'onChange' | 'renderInput'
  > {
  value?: Dayjs | null
  onChange?: (newValue: Dayjs | null) => void
  label?: string
  withProvider?: boolean // 👈 optional in case you ever want to disable auto-wrapper
}

export default function CalendarInput({
  value,
  onChange,
  label,
  withProvider = true,
  ...rest
}: CalendarInputProps): React.JSX.Element {
  const picker = (
    <DatePicker
      label={label}
      value={value ?? null}
      onChange={onChange}
      slotProps={{
        textField: { fullWidth: true }
      }}
      {...rest} // ✅ spread all DatePicker props safely
    />
  )

  // ✅ Wrap automatically with LocalizationProvider
  if (withProvider) {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>{picker}</LocalizationProvider>
  }

  // If already wrapped higher up
  return picker
}
