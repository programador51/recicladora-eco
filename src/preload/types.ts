import { Material } from '../main/models/material'
import { InventarioGrouped } from '../main/models/material/types'
import { MaterialFormInsert } from '../renderer/src/helpers/validations/earnings/index'

export interface MainWorldApi {
  getMaterials: () => Promise<Material[]>
  insertMaterial: (material: MaterialFormInsert) => Promise<void>
  getInventory: () => Promise<InventarioGrouped[]>
}
