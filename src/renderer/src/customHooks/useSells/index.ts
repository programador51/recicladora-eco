import { SellI } from 'src/main/models/sells/types'
import { ReturnUseSells } from './types'
import { useState } from 'react'

export default function useSells(): ReturnUseSells {
  const [sells, setSells] = useState<SellI[]>([])

  const [pendingToSend, setPendingToSend] = useState<SellI[]>([])

  function getSells(): Promise<SellI[]> {
    return window.api.getSells().then((items) => {
      const revenues = items.map((v) => ({
        ...v,
        ganancia: v.kilos_vendidos * v.precio_kg
      }))

      setSells(revenues)

      const pending = revenues.filter((item) => item.fecha_salida === null)

      setPendingToSend(pending)

      return items
    })
  }

  return { getSells, sells, pendingToSend }
}
