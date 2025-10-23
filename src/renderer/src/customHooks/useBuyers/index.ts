import { Buyers } from 'src/main/models/buyers/types'
import { ReturnUseBuyers } from './types'

export default function useBuyers(): ReturnUseBuyers {
  const getBuyers = (): Promise<Buyers[]> => {
    return window.api
      .getBuyers()
      .then((buyers) => {
        return buyers
      })
      .catch(() => [] as Buyers[])
  }

  return { getBuyers }
}
