import { Earn } from '@renderer/atoms/EarningItem/types'
import { useEffect, useState } from 'react'
import { ReturnUseEarnings } from './types'

export default function useEarnings(): ReturnUseEarnings {
  const [items, setItems] = useState<Earn[]>([])
  useEffect(() => {
    window.api
      .getMaterials()
      .then((materials) => {
        const dbItems: Earn[] = materials.map((item) => ({
          earning: 0,
          material: item.nombre_material,
          id:item.id_material||window.crypto.randomUUID()
        }))

        setItems(dbItems)
      })
      .catch((e) => console.error(e))
  }, [])

  return {
    items
  }
}
