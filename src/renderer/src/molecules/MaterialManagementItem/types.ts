export interface PropsMaterialManagementItem {
  material: string
  demanda?: Quality
  calidad?: Quality
}

export type Quality = 'alta' | 'media' | 'baja'
