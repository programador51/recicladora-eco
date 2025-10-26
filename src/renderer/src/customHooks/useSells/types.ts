import { SellI } from 'src/main/models/sells/types'

export interface ReturnUseSells {
  getSells: () => Promise<SellI[]>
  sells: SellI[]
  pendingToSend: SellI[]
}
