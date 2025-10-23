import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectProps } from '@mui/material/Select'
import useBuyers from '@renderer/customHooks/useBuyers'
import { Buyers } from 'src/main/models/buyers/types'

export default function SellerInput(props:SelectProps): React.JSX.Element {

  const [list, setList] = useState<Buyers[]>([])

  const buyers = useBuyers()

  const id = useRef(`${window.crypto.randomUUID()}-select`)



  useEffect(() => {
    buyers.getBuyers().then((data) => setList(data))
  }, [])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <InputLabel shrink id={id.current}>
          Comprador
        </InputLabel>
        <Select
          {...props}
          labelId={id.current}
          id={`${id.current}-id`}
          // value={age}
          label="Comprador"
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: '#aaa' }}>Selecciona un comprador</span>
            }
            return list.find(item=>item.id_comprador===+selected)?.nombre || "?"
          }}
        >
          {list.map((buyer) => (
            <MenuItem key={`buyer_${buyer.id_comprador}`} value={buyer.id_comprador}>
              {buyer.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
