import { getDb } from '../../db'

export const DEFAULT_USER_ID = 'USR001';

export function ensureDefaultUser(): void {
  // Check if the table is empty
  const { count } = getDb().prepare(`SELECT COUNT(*) as count FROM Usuario`).get() as {
    count: number
  }

  if (count === 0) {
    // Insert a default user
    getDb()
      .prepare(
        `
      INSERT INTO Usuario (id_usuario, total_kilos, total_puntos)
      VALUES (@id_usuario, @total_kilos, @total_puntos)
    `
      )
      .run({
        id_usuario: DEFAULT_USER_ID,
        total_kilos: 0,
        total_puntos: 0
      })

    console.log('✅ Default user inserted: USR001')
  } else {
    console.log('ℹ️ Usuario table already has records, skipping insert.')
  }
}
