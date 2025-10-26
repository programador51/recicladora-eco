import { IconButton, Tooltip } from '@mui/material'
import Swal from 'sweetalert2'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

export default function CompleteSell({
  idVenta,
  sentDate = null
}: {
  idVenta: number
  onConfirmed?: (idVenta: number) => void,
  sentDate: string | null
}): React.JSX.Element {
  const handleConfirm = async (): Promise<void> => {

    if(sentDate === null){
      Swal.fire({
        title: 'No se puede completar la venta',
        text: 'La venta no ha sido enviada aún. Logistica debe enviar el material primero.',
        icon: 'warning'
      })
      return;
    }

    const result = await Swal.fire({
      title: '¿Marcar venta como completada?',
      text: 'Esta acción cambiará el estado de la venta a entregada.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        window.api.markSellAsDelivered(idVenta).then(()=>window.location.reload());

      } catch (error) {
        console.error('Error al actualizar la venta:', error)
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar la venta.',
          icon: 'error'
        })
      }
    }
  }

  return (
    <Tooltip title="Marcar como entregada">
      <IconButton color="info" onClick={handleConfirm}>
        <LocalShippingIcon />
      </IconButton>
    </Tooltip>
  )
}
