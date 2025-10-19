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

  const onSubmit = (data: MaterialForm):void => {
    console.log(data);

    window.location.reload();

  }

  const [items, setItems] = useState<Earn[]>([])
  useEffect(() => {
    window.api
      .getMaterials()
      .then((materials) => {
        const dbItems: Earn[] = materials.map((item) => ({
          earning: 0,
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
