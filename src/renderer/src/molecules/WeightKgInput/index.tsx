import React, { useState } from 'react'

import { InputAdornment, TextField } from '@mui/material'

export default function WeightKgInput(): React.JSX.Element {
  const [value, setValue] = useState('0')
  const handleBlur = (): void => {
    if (value.trim() === '') {
      setValue('0')
    }
  }

  return (
    <TextField
      size="small"
      fullWidth
      label="Peso en kilogramos"
      id="outlined-start-adornment"
      onBlur={handleBlur}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">kg</InputAdornment>
        }
      }}
    />
  )
}
