import { getDb } from '../../db'

/**
 * Inserta un nuevo envío con la fecha de salida (sin fecha de entrega aún)
 * @param id_venta - ID de la venta relacionada
 * @param fecha_salida - Fecha de salida en formato ISO (ejemplo: new Date().toISOString())
 * @returns ID del envío insertado
 */
export function createLogisticSend({
  id_venta,
  fecha_salida = new Date().toISOString()
}: {
  id_venta: number
  fecha_salida?: string
}): number {
  try {
    const db = getDb();

    if (!db) throw new Error('Base de datos no inicializada. Llama a initDatabase() primero.')

    const stmt = db.prepare(`
    INSERT INTO LogisticaEnvios (id_venta, fecha_salida)
    VALUES (?, ?);
  `)

    const result = stmt.run(id_venta, fecha_salida)

    console.log('Nuevo envío creado con ID:', result.lastInsertRowid)

    return result.lastInsertRowid as number
  } catch (error) {
    console.log(error)
    return 0
  }
}

/**
 * Actualiza la fecha de entrega de un envío existente
 * @param id_envio - ID del envío
 * @param fecha_entrega - Fecha de entrega (ISO string)
 */
export function updateDeliverDate(id_envio: number, fecha_entrega: string): void {
  const db = getDb()

  if (!db) throw new Error('Base de datos no inicializada. Llama a initDatabase() primero.')

  const stmt = db.prepare(`
    UPDATE LogisticaEnvios
    SET fecha_entrega = ?
    WHERE id_envio = ?;
  `)

  stmt.run(fecha_entrega, id_envio)
}
