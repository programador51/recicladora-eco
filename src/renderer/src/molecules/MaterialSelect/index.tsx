import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormHelperText } from '@mui/material'

import React, { useRef } from 'react'
import useEarnings from '@renderer/customHooks/useEarnings'
import { PropsOnChangeMaterial } from './types'

export default function MaterialSelect({
  onChange = () => {}
}: PropsOnChangeMaterial): React.JSX.Element {
  const [age, setAge] = React.useState('')

  const hook = useEarnings()

  const id = useRef(`${window.crypto.randomUUID()}-select`)

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value as string)

    const item = hook.items.find((item) => item.id === event.target.value)

    if (item) onChange(item)
  }

  return (
    <Box>
      <FormControl fullWidth size="small">
        <InputLabel shrink id={id.current}>
          Material
        </InputLabel>
        <Select
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: '#aaa' }}>Selecciona un material</span>
            }
            return hook.items.find((item) => item.id === selected)?.material
          }}
          labelId={id.current}
          id={`${id.current}-id`}
          value={age}
          label="Material"
          onChange={handleChange}
        >
          {hook.items.map((item, i) => (
            <MenuItem key={`${item.material}_${i}_select`} value={item.id}>
              {item.material}
            </MenuItem>
          ))}
        </Select>

        <FormHelperText>Lista de materiales manejados por la empresa</FormHelperText>
      </FormControl>
    </Box>
  )
}
