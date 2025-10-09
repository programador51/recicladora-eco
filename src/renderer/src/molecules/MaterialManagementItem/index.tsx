import React from 'react'
import { Stack, Typography } from '@mui/material'
import { grey, green } from '@mui/material/colors'
import { PropsMaterialManagementItem } from './types'
import Grid from '@mui/material/Grid'

export default function MaterialManagementItem({
  material = 'Plástico PET',
  demanda = 'alta',
  calidad = 'alta'
}: PropsMaterialManagementItem): React.JSX.Element {

    const colors = {
        "alta":"🟢",
        "media":"🟡",
        "baja":"🔴",
    }


  return (
    <Grid alignItems={'center'} container spacing={3} marginBottom={1}>
      <Grid size={4}>
        
        <Typography variant="body2">{material}</Typography>
      </Grid>
      <Grid size={4}>
        
        <Typography fontWeight={'bold'} variant="body2" >
          {colors[demanda]} Demanda {demanda}
        </Typography>
      </Grid>
      <Grid size={4}>
        {' '}
        <Typography fontWeight={'bold'} variant="body2" >
          {colors[calidad]} Calidad {calidad}
        </Typography>
      </Grid>
    </Grid>
  )

  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      sx={{ background: grey[50] }}
      padding={'5px 10px'}
      borderRadius={'5px'}
      marginTop={'10px'}
    >
      <Typography variant="body2">material{}</Typography>
      <Typography fontWeight={'bold'} variant="body2" sx={{ color: green[600] }}>
        Demanda: {demanda}
      </Typography>

      <Typography fontWeight={'bold'} variant="body2" sx={{ color: green[600] }}>
        Calidad: {calidad}
      </Typography>
    </Stack>
  )
}
