export interface SellI {
  id_venta: number
  id_transaccion: number
  kilos_vendidos: number
  entregado: number
  id_comprador: number
  comprador: string
  precio_kg: number
  distancia_km: number
  id_material: number
  nombre_material: string
  ganancia: number
  fecha_salida: string
  fecha_entrega: string | null
}
