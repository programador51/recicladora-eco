import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import { grey, green } from '@mui/material/colors'
import { PropsDetailMaterial } from './types'

export default function CurrentCapacityMaterial({
  material = 'Plástico PET',
  kg = 0,
  m = 0
}: PropsDetailMaterial): React.JSX.Element {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      sx={{ background: grey[50] }}
      padding={'5px 10px'}
      borderRadius={'5px'}
      marginTop={'10px'}
    >
      <Typography variant="body2">{material}</Typography>
      <Typography variant="body2">
        {kg} kg. / {m} m³
      </Typography>
    </Stack>
  )
}
