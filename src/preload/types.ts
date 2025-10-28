import { Buyers } from '../main/models/buyers/types'
import { Material } from '../main/models/material'
import { InventarioGrouped } from '../main/models/material/types'
import { SaleFormData } from '../main/models/sells'
import { SellI } from '../main/models/sells/types'
import { MaterialFormInsert } from '../renderer/src/helpers/validations/earnings/index'

export interface MainWorldApi {
  getMaterials: () => Promise<Material[]>
  insertMaterial: (material: MaterialFormInsert) => Promise<void>
  getInventory: () => Promise<InventarioGrouped[]>
  getBuyers: () => Promise<Buyers[]>
  addSell: (sell: SaleFormData) => Promise<void>;
  getSells: () => Promise<SellI[]>;
  markSellAsDelivered: (idVenta: number) => Promise<void>;
  createLogisticSend: (data: { id_venta: number; fecha_salida?: string }) => Promise<number>;
  updateDeliverDate: (id_envio: number, fecha_entrega: string) => Promise<void>;
  getReportPdf: () => Promise<Buffer>;
}
