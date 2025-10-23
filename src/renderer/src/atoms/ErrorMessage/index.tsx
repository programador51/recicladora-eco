import React from 'react'
import { Typography, SxProps } from '@mui/material'

interface ErrorMessageAtomProps {
  error?: { message?: string } // From react-hook-form’s FieldError
  align?: 'left' | 'center' | 'right'
  sx?: SxProps
}

const ErrorMessageAtom: React.FC<ErrorMessageAtomProps> = ({ error, align = 'left'}) => {
  if (!error?.message) return null

  return (
    <Typography
      variant="caption"
      fontWeight={'bold'}
      color="error"
      textAlign={align}
      //   sx={{ mt: "-4px", ml: "4px", ...sx }}
    >
      ❌ {error.message}
    </Typography>
  )
}

export default ErrorMessageAtom
