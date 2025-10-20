import { getDb } from '../../db'
import { InventarioInput } from './types'

export function saveInventarioRecord(data: InventarioInput): number {
  const stmt = getDb().prepare(`
    INSERT INTO Inventario (
      id_usuario,
      id_material,
      id_almacen,
      kilos_almacenados,
      volumen_almacenado_m3,
      factor_volumen_m3,
      presentacion,
      borradoLogico
    ) VALUES (
      @id_usuario,
      @id_material,
      @id_almacen,
      @kilos_almacenados,
      @volumen_almacenado_m3,
      @factor_volumen_m3,
      @presentacion,
      @borradoLogico
    )
  `)

  const result = stmt.run({
    ...data,
    borradoLogico: data.borradoLogico ?? 0 // default to 0 if not provided
  })

  return result.lastInsertRowid as number
}
