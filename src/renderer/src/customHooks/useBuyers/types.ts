import { Buyers } from 'src/main/models/buyers/types'

export interface ReturnUseBuyers {
  getBuyers: () => Promise<Buyers[]>
}
