import { getDb } from '../../db'
import { SellI } from './types'

export interface SaleFormData {
  material: number
  weightKg: number
  seller: number
}

/**
 * Inserts a new record into the Venta table (without transaction link)
 * Uses 0 for id_transaccion temporarily.
 */
export function insertSell(venta: SaleFormData): number {
  const db = getDb()

  const stmt = db.prepare(`
    INSERT INTO Venta (id_transaccion, id_comprador, kilos_vendidos, entregado)
    VALUES (0, @id_comprador, @kilos_vendidos, @entregado)
  `)

  const result = stmt.run({
    id_comprador: venta.seller,
    kilos_vendidos: venta.weightKg,
    entregado: 0
  })

  return result.lastInsertRowid as number
}

export function getAllSells(): SellI[] {
  const db = getDb()

  const stmt = db.prepare(`
 SELECT 
    v.id_venta,
    v.id_transaccion,
    v.kilos_vendidos,
    v.entregado,
    c.id_comprador,
    c.nombre AS comprador,
    c.precio_kg,
    c.distancia_km,
    m.id_material,
    m.nombre_material,
    m.ganancia,
     COALESCE(le.fecha_salida, NULL) AS fecha_salida,
    COALESCE(le.fecha_entrega, NULL) AS fecha_entrega
  FROM Venta v
  INNER JOIN Comprador c ON v.id_comprador = c.id_comprador
  LEFT JOIN Material m ON c.id_material = m.id_material
  LEFT JOIN LogisticaEnvios le ON v.id_venta = le.id_venta
  ORDER BY v.id_venta DESC;
  `)

  const ventas = stmt.all()

  return ventas as SellI[]
}

export function markSellAsDelivered(idVenta: number): void {
  const db = getDb();
  const stmt = db.prepare(`UPDATE Venta SET entregado = 1 WHERE id_venta = ?`)
  stmt.run(idVenta)
}
