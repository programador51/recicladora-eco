import React from 'react'
import { NavLink } from 'react-router'
import { Button, Typography } from '@mui/material'
import { cyan } from '@mui/material/colors'
import {
  gamificacion,
  ganancias,
  gestion,
  impacto,
  logistica,
  reportes,
  ventas
} from '@renderer/routes'

export default function Nav(): React.JSX.Element {
  const links = [
    { name: 'Ganancias', path: ganancias },
    { name: 'Gestion', path: gestion },
    { name: 'Venta', path: ventas },
    { name: 'Impacto', path: impacto },
    { name: 'Reportes', path: reportes },
    { name: 'Gamificación', path: gamificacion },
    { name: 'Logística', path: logistica }
  ]

  return (
    <>
      <Typography
        margin={'0 0 20px 0'}
        variant="h6"
        sx={{ color: cyan[50] }}
        textAlign={'center'}
        fontWeight={'bold'}
      >
        Dashboard
      </Typography>

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
