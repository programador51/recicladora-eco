import { SellI } from 'src/main/models/sells/types'
import { ReturnUseSells } from './types'
import { useState } from 'react'

export default function useSells(): ReturnUseSells {
  const [sells, setSells] = useState<SellI[]>([])

  function getSells(): Promise<SellI[]> {
    return window.api.getSells().then((items) => {
      setSells(items)
      return items
    })
  }

  return { getSells, sells }
}
