import { getDb } from '../../db'
import { calcularGanancia } from '../../../renderer/src/helpers/earnings/index'
import { MaterialFormInsert } from '../../../renderer/src/helpers/validations/earnings'
import { saveInventarioRecord } from '../inventory'
import { DEFAULT_USER_ID } from '../users'
import { InventarioGrouped } from './types'
export type Demanda = 'alta' | 'media' | 'baja'
export type Calidad = 'alta' | 'media' | 'baja'

export interface Material {
  id_material?: number // se autoincrementa, opcional al insertar
  nombre_material: string
  demanda: Demanda
  calidad: Calidad
  ganancia: number
  borradoLogico?: 0 | 1 // opcional, default 0
}

export const dummyMaterials: Material[] = [
  { ganancia: 0, nombre_material: 'Cartón', demanda: 'alta', calidad: 'media', borradoLogico: 0 },
  { ganancia: 0, nombre_material: 'Vidrio', demanda: 'media', calidad: 'alta', borradoLogico: 0 },
  {
    ganancia: 0,
    nombre_material: 'Plástico PET',
    demanda: 'alta',
    calidad: 'alta',
    borradoLogico: 0
  },
  {
    ganancia: 0,
    nombre_material: 'Plástico HDPE',
    demanda: 'media',
    calidad: 'media',
    borradoLogico: 0
  },
  { ganancia: 0, nombre_material: 'Aluminio', demanda: 'alta', calidad: 'alta', borradoLogico: 0 }
]

export function insertMaterial(material: MaterialFormInsert): void {
  // const materials = getMaterials()

  const db = getDb()

  const insert = db.prepare(`
  INSERT INTO Material (
    nombre_material,
    demanda,
    calidad,
    ganancia,
    borradoLogico,
    fecha_creacion
  ) VALUES (?, ?, ?, ?, ?, datetime('now'))
`)

  const { lastInsertRowid } = insert.run(
    material.nombre,
    'baja',
    material.pureza,
    calcularGanancia(material.kilos_almacenados, 10, material.pureza),
    0
  )

  saveInventarioRecord({
    factor_volumen_m3: 1,
    id_almacen: 1,
    id_material: typeof lastInsertRowid === 'number' ? lastInsertRowid : 0,
    id_usuario: DEFAULT_USER_ID,
    kilos_almacenados: material.kilos_almacenados,
    presentacion: 'suelto',
    volumen_almacenado_m3: material.volumen_almacenado_m3,
    borradoLogico: 0
  })

  // insert.run(material.nombre_material, material.demanda, material.calidad, 0)
}

export function getMaterials(): Material[] {
  const db = getDb()
  const stmt = db.prepare(`
    SELECT id_material, nombre_material, demanda, calidad, borradoLogico,ganancia
    FROM Material
    WHERE borradoLogico = 0
  `)

  const data = stmt.all() as Material[]

  if (data.length <= 0) {
    dummyMaterials.forEach((mat) =>
      insertMaterial({
        nombre: mat.nombre_material,
        kilos_almacenados: 0,
        pureza: 'baja',
        volumen_almacenado_m3: 0
      })
    )
    return getMaterials()
  }

  return stmt.all() as Material[]
}

/**
 * Returns the sum of kilos and volume grouped by material name.
 */
export function getInventarioGroupedByMaterial(): InventarioGrouped[] {
  const query = `
    SELECT 
      M.nombre_material AS nombre_material,
      SUM(I.kilos_almacenados) AS total_kilos,
      SUM(I.volumen_almacenado_m3) AS total_volumen_m3
    FROM Inventario I
    INNER JOIN Material M ON I.id_material = M.id_material
    WHERE I.borradoLogico = 0
    GROUP BY M.nombre_material
    ORDER BY M.nombre_material ASC;
  `

  const stmt = getDb().prepare(query)
  const results = stmt.all() as InventarioGrouped[]

  return results
}