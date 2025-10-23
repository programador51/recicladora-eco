import { getDb } from '../../db'

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
