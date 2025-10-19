import React from 'react'
import { NavLink } from 'react-router'
import { Button, Typography, Stack } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import { cyan } from '@mui/material/colors'
import { ganancias, gestion, impacto, logistica, reportes, ventas } from '@renderer/routes'

export default function Nav(): React.JSX.Element {
  const links = [
    { name: 'Ganancias', path: ganancias },
    { name: 'Gestion', path: gestion },
    { name: 'Venta', path: ventas },
    { name: 'Impacto', path: impacto },
    { name: 'Reportes', path: reportes },
    // { name: 'Gamificación', path: gamificacion },
    { name: 'Logística', path: logistica }
  ]

  return (
    <>
      <Stack
        flexDirection={'row'}
        gap={1}
        alignItems={'center'}
        marginBottom={3}
        justifyContent={'center'}
      >
        <NavLink to={'/'}>
          <IconButton>
            <HomeIcon color="primary" />
          </IconButton>
        </NavLink>
        <Typography
          // margin={'0 0 20px 0'}
          variant="h6"
          sx={{ color: cyan[50] }}
          textAlign={'center'}
          fontWeight={'bold'}
        >
          Dashboard
        </Typography>
      </Stack>

      {links.map((link) => (
        <NavLink key={link.path} to={`/${link.path}`} style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <Button
              fullWidth
              variant={isActive ? 'contained' : 'text'}
              sx={{ color: cyan[50], borderRadius: '0px' }}
            >
              {link.name}
            </Button>
          )}
        </NavLink>
      ))}
    </>
  )
}
