import { getDb } from '../../db'

/**
 * Crea un registro dummy en Almacen si no existe ninguno
 */
export function ensureDummyWarehouse(): void {
  // Revisar si hay algún registro

  const db = getDb()

  const { total } = db.prepare('SELECT COUNT(*) AS total FROM Almacen').get() as {total:number};

  if (total === 0) {
    // Si no hay registros, insertamos uno dummy
    db.prepare(
      `
      INSERT INTO Almacen (
        kilos_capacidad,
        volumen_capacidad_m3,
        kilos_capacidad_actual,
        volumen_capacidad_actual_m3
      ) VALUES (?, ?, ?, ?)
    `
    ).run(1000, 10, 0, 0) // valores dummy: 1000kg, 10 m3, capacidad actual 0
    console.log('Se creó un almacén dummy.')
  } else {
    console.log('Ya existe al menos un almacén.')
  }
}
