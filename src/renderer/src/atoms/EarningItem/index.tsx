import { Stack, Typography } from '@mui/material'
import { grey, green } from '@mui/material/colors'
import { Earn } from './types'

export default function EarningItem({
  material = 'Plástico PET',
  earning = 80,
  
}: Earn): React.JSX.Element {
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
      <Typography fontWeight={'bold'} variant="body2" sx={{ color: green[600] }}>
        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(earning)}
      </Typography>
    </Stack>
  )
}
