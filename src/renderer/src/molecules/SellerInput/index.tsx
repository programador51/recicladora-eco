import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import useBuyers from '@renderer/customHooks/useBuyers'
import { Buyers } from 'src/main/models/buyers/types'
import { FormHelperText } from '@mui/material';
import { PropsSellerInput } from './types'

export default function SellerInput(props:PropsSellerInput): React.JSX.Element {

  const [list, setList] = useState<Buyers[]>([])

  const buyers = useBuyers();

  // alert(JSON.stringify(list));

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
          value={props.value}
          labelId={id.current}
          id={`${id.current}-id`}
          label="Comprador"
          displayEmpty
          
          onChange={props.onChange}
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: '#aaa' }}>Selecciona un comprador</span>
            }
            return list.find(item=>item.id_comprador===+selected)?.nombre || "?"
          }}
        >
          {list.map((buyer) => (
            <MenuItem disabled={props.idMaterial!==buyer.id_material} key={`buyer_${buyer.id_comprador}`} value={buyer.id_comprador}>
              
              {buyer.nombre} | {buyer.nombre_material}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Solo se habilitan compradores que manejen el material seleccionado.
        </FormHelperText>
      </FormControl>
    </Box>
  )
}
