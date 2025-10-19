import React, { useEffect, useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { PropsVolumenInput } from './types'

export default function VolumenInput({
  onChange = () => {}
}: PropsVolumenInput): React.JSX.Element {
  const [value, setValue] = useState('0')
  const handleBlur = (): void => {
    if (value.trim() === '') {
      setValue('0')
    }
  }

  useEffect(() => {
    onChange(+value)
  }, [value])

  return (
    <TextField
      size="small"
      fullWidth
      label="Volumen en metros cubicos"
      id="outlined-start-adornment"
      onBlur={handleBlur}
      value={value}
      helperText="Volumen que requiere el registro de entrada"
      onChange={(e) => setValue(e.target.value.replaceAll('-', ''))}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">m <sup>3</sup>  </InputAdornment>
        }
      }}
    />
  )
}
