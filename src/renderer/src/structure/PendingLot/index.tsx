import { useState, useEffect, ChangeEvent } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

interface RenglonCheckboxProps {
  /** Texto que se mostrará como leyenda (por defecto el solicitado) */
  label?: string;
  /** Controla el checkbox desde fuera (opcional) */
  checked?: boolean;
  /** Handler cuando cambia el checkbox */
  onChange?: (checked: boolean) => void;
  /** Props extra para el contenedor */
  sx?: object;
}

/**
 * Componente "renglón" de una sola línea con un checkbox y leyenda.
 * - Por defecto muestra: "Venta a recicladora verde 100kg de PET"
 * - Soporta control externo (checked + onChange) o internal state si no se provee.
 */
export default function PendingLot({
  label = "Venta a recicladora verde 100kg de PET",
  checked = false,
  onChange,
  sx = {},
}: RenglonCheckboxProps): React.JSX.Element {
  const [internalChecked, setInternalChecked] = useState<boolean>(checked);

  // Si el componente es controlado desde afuera, sincronizamos el estado interno
  useEffect(() => {
    if (typeof checked === "boolean") setInternalChecked(checked);
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    // Si el usuario pasó un onChange, lo notificamos
    if (onChange) onChange(next);
    // Si no es controlado por props, actualizamos el estado interno
    if (typeof checked !== "boolean") setInternalChecked(next);
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        whiteSpace: "nowrap", // evita que la línea haga wrap
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...sx,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={internalChecked}
            onChange={handleChange}
            inputProps={{ "aria-label": label }}
            size="medium"
          />
        }
        label={<Typography variant="body1" noWrap>{label}</Typography>}
        sx={{ m: 0 }}
      />
    </Box>
  );
}
