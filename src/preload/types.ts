import { Material } from '../main/models/material'

export interface MainWorldApi {
  getMaterials: () => Promise<Material[]>
  insertMaterial: (material: Material) => Promise<void>
}
