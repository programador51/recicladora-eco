import { getDb } from "../../db"

export function seedCompradoresIfEmpty(): void {

    const db = getDb();

  const {count} = db.prepare('SELECT COUNT(*) AS count FROM Comprador').get() as {count:number};
  if (count > 0) {
    console.log('-> Tabla Comprador ya contiene datos.')
    return
  }

  console.log('-> Insertando datos dummy en Comprador...')

  const materiales = [
    { nombre: 'PET transparente', demanda: 'alta', calidad: 'alta', ganancia: 0 },
    { nombre: 'Cartón', demanda: 'media', calidad: 'media', ganancia: 0 },
    { nombre: 'Aluminio', demanda: 'alta', calidad: 'alta', ganancia: 0 },
    { nombre: 'Vidrio verde', demanda: 'media', calidad: 'media', ganancia: 0 },
    { nombre: 'HDPE (plástico duro)', demanda: 'alta', calidad: 'alta', ganancia: 0 }
  ]

  const insertMaterial = db.prepare(`
    INSERT INTO Material (nombre_material, demanda, calidad, ganancia)
    VALUES (@nombre, @demanda, @calidad, @ganancia)
  `)

  const insertComprador = db.prepare(`
    INSERT INTO Comprador (nombre, distancia_km, id_material, precio_kg)
    VALUES (@nombre, @distancia_km, @id_material, @precio_kg)
  `)

  const insertTx = db.transaction(() => {
    for (const m of materiales) {
      insertMaterial.run(m)
    }

    const materialRows = db.prepare('SELECT id_material, nombre_material FROM Material').all()

    const compradores = [
      { nombre: 'EcoRecicladora del Norte', distancia_km: 5.2, material: 'PET transparente', precio_kg: 4.5 },
      { nombre: 'Centro Verde Sustentable', distancia_km: 8.7, material: 'Cartón', precio_kg: 2.3 },
      { nombre: 'ReciclaMetales MX', distancia_km: 12.1, material: 'Aluminio', precio_kg: 6.0 },
      { nombre: 'Vidrios Reciclados del Valle', distancia_km: 6.5, material: 'Vidrio verde', precio_kg: 1.8 },
      { nombre: 'PlastiRenova SA', distancia_km: 10.3, material: 'HDPE (plástico duro)', precio_kg: 4.8 }
    ]

    for (const c of compradores) {
      const mat = materialRows.find(m => m.nombre_material === c.material)
      if (mat) {
        insertComprador.run({
          nombre: c.nombre,
          distancia_km: c.distancia_km,
          id_material: mat.id_material,
          precio_kg: c.precio_kg
        })
      }
    }
  })

  insertTx()
  console.log('-> Datos dummy insertados correctamente en Comprador.')
}