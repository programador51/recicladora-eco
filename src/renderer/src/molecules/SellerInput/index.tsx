import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function SellerInput(): React.JSX.Element {
  const [age, setAge] = React.useState('')

  const id = useRef(`${window.crypto.randomUUID()}-select`)

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value as string)
  }

  return (
    <Box>
      <FormControl fullWidth size="small">
        <InputLabel shrink id={id.current}>Comprador</InputLabel>
        <Select
            
          labelId={id.current}
          id={`${id.current}-id`}
          value={age}
          label="Comprador"
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: '#aaa' }}>Selecciona un comprador</span>
            }
            return selected
          }}
        >

          <MenuItem value={10}>PlastiCycle MX</MenuItem>
          <MenuItem value={20}>EcoPlast Compras</MenuItem>
          <MenuItem value={30}>Polímero Verde S.A.</MenuItem>
          <MenuItem value={30}>CircularPlast Co.</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
