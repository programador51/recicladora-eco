import { useEffect, useState } from 'react'
import { ReturnUseManagmentMaterials, StateUseManagmentMaterial } from './types'

export default function useManagmentMaterial(): ReturnUseManagmentMaterials {
  const [state, setState] = useState<StateUseManagmentMaterial>({
    materials: [],
    totalKg: 0,
    totalVol: 0,
    remaingKg: 0,
    remaingVol: 0
  })

  useEffect(() => {
    window.api.getInventory().then((value) => {
      const totals = value.reduce(
        (totals, item) => ({
          totalKg: totals.totalKg + item.total_kilos,
          totalVol: totals.totalVol + item.total_volumen_m3
        }),
        { totalKg: 0, totalVol: 0 }
      )

      const remaingKg = +((1000 - totals.totalKg).toFixed(2))
      const remaingVol = +((10 - totals.totalVol).toFixed(2))

      setState((current) => ({
        ...current,
        materials: value.filter((item) => item.total_kilos > 0),
        ...totals,
        remaingKg,
        remaingVol,
        totalKg: +totals.totalKg.toFixed(2),
        totalVol: +totals.totalVol.toFixed(2)
      }))
    })
  }, [])

  return {
    ...state
  }
}
