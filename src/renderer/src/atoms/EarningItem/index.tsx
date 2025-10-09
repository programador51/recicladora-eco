import { Stack, Typography } from '@mui/material'
  import { grey , green } from '@mui/material/colors'

export default function EarningItem({
  material = 'Plástico PET',
  earning = 80
}: {
  earning: number
  material: string
}): React.JSX.Element {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      sx={{ background: grey[50] }}
      padding={'5px 10px'}
      borderRadius={'5px'}
      marginTop={'10px'}
    >
      <Typography variant='body2'>{material}</Typography>
      <Typography fontWeight={'bold'} variant='body2' sx={{color: green[600]}}>
        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(earning)}
      </Typography>
    </Stack>
  )
}
