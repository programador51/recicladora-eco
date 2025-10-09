import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import React, { useRef } from 'react'

export default function MaterialSelect(): React.JSX.Element {
  const [age, setAge] = React.useState('');

  const id = useRef(`${window.crypto.randomUUID()}-select`);

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value as string)
  }

  return (
    <Box>
      <FormControl fullWidth size='small'>
        <InputLabel shrink id={id.current}>Material</InputLabel>
        <Select
        displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: '#aaa' }}>Selecciona un material</span>
            }
            return selected
          }}
          labelId={id.current}
          id={`${id.current}-id`}
          value={age}
          label="Material"
          
          onChange={handleChange}
        >
          <MenuItem value={10}>Plástico PET</MenuItem>
          <MenuItem value={20}>Cartón</MenuItem>
          <MenuItem value={30}>Aluminio</MenuItem>
          <MenuItem value={30}>Vidrio</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
