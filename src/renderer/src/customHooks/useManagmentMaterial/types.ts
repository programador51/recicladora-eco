import { InventarioGrouped } from 'src/main/models/material/types'

export interface StateUseManagmentMaterial {
  materials: InventarioGrouped[]
  totalKg: number
  totalVol: number
  remaingKg: number
  remaingVol: number
}

export interface ReturnUseManagmentMaterials extends StateUseManagmentMaterial {}
