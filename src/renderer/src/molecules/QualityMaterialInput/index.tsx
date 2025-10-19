import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FormHelperText } from '@mui/material'

// Enum de pureza
export type Pureza = 'alta' | 'media' | 'baja';

interface PurezaSelectProps {
  onChange?: (value: Pureza) => void;
  label?: string;
  defaultValue?: Pureza; // opcional para valor inicial
}

export const PurezaSelect: React.FC<PurezaSelectProps> = ({
  onChange = () => {},
  label = 'Pureza',
  defaultValue = 'media'
}) => {
  // Estado interno para value
  const [value, setValue] = useState<Pureza>(defaultValue);

  const handleChange = (event: SelectChangeEvent): void => {
    const selected = event.target.value as Pureza;
    setValue(selected); // actualiza estado interno
    onChange(selected); // callback externo
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="pureza-label">{label}</InputLabel>
      <Select size='small' labelId="pureza-label" value={value} label={label} onChange={handleChange}>
        <MenuItem value="alta">Alta</MenuItem>
        <MenuItem value="media">Media</MenuItem>
        <MenuItem value="baja">Baja</MenuItem>
      </Select>
      <FormHelperText>Calidad del material, influye a su precio de venta</FormHelperText>
    </FormControl>
  );
};
