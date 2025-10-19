import { Earn } from '@renderer/atoms/EarningItem/types'
import { useEffect, useState } from 'react'
import { ReturnUseEarnings } from './types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MaterialForm, materialSchema } from '@renderer/helpers/validations/earnings'

export default function useEarnings(): ReturnUseEarnings {
  const form = useForm<MaterialForm>({
    resolver: yupResolver(materialSchema)
  })

  const onSubmit = (data: MaterialForm): void => {
    const item = items.find((item) => item.id === data.id_material)

    window.api
      .insertMaterial({
        pureza: data.pureza,
        nombre: item?.material || '',
        kilos_almacenados: data.kilos_almacenados,
        volumen_almacenado_m3: data.volumen_almacenado_m3
      })
      .then(() => window.location.reload())
  }

  const [items, setItems] = useState<Earn[]>([])
  useEffect(() => {
    window.api
      .getMaterials()
      .then((materials) => {
        const dbItems: Earn[] = materials.map((item) => ({
          earning: item.ganancia,
          material: item.nombre_material,
          id: item.id_material || window.crypto.randomUUID()
        }))

        setItems(dbItems)
      })
      .catch((e) => console.error(e))
  }, [])

  return {
    items,
    form,
    onSubmit
  }
}
