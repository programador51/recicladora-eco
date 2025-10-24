import { IconButton, Tooltip } from '@mui/material'
import Swal from 'sweetalert2'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

export default function CompleteSell({
  idVenta
}: {
  idVenta: number
  onConfirmed?: (idVenta: number) => void
}): React.JSX.Element {
  const handleConfirm = async (): Promise<void> => {
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
        // alert(idVenta)

        window.api.markSellAsDelivered(idVenta).then(()=>window.location.reload());
        // window.location.reload()
        // const db = getDb()
        // const stmt = db.prepare(`UPDATE Venta SET entregado = 1 WHERE id_venta = ?`)
        // stmt.run(idVenta)

        // await Swal.fire({
        //   title: 'Completado',
        //   text: 'La venta se ha marcado como entregada.',
        //   icon: 'success',
        //   timer: 2000,
        //   showConfirmButton: false,
        // })

        // if (onConfirmed) onConfirmed(idVenta) // callback to refresh UI
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
