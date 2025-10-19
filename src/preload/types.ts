import { Material } from '../main/models/material'
import { MaterialFormInsert } from '../renderer/src/helpers/validations/earnings/index';

export interface MainWorldApi {
  getMaterials: () => Promise<Material[]>
  insertMaterial: (material: MaterialFormInsert) => Promise<void>
}
