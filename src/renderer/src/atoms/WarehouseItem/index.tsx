import { Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function WarehouseItem({
  material = 'Plástico PET',
  kg = 0,
  volumen = 0
}: {
  kg: number
  volumen: number
  material: string
}): React.JSX.Element {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      sx={{ background: grey[50] }}
      padding={'10px 10px'}
      borderRadius={'5px'}
      marginTop={'10px'}
    >
      <Typography variant="body2">{material}</Typography>
      <Typography fontWeight={'bold'} variant="body2">
        {kg} kg / {volumen} m3
      </Typography>
    </Stack>
  )
}
