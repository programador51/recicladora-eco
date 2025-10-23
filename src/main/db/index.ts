import DatabaseConstructor, { Database } from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'
import fs from 'fs'

let db: Database

export function initDatabase(): void {
  // Ensure Electron app is ready
  if (!app.isReady()) {
    throw new Error('Electron app must be ready before initializing the database.')
  }

  const dbPath = path.join(app.getPath('userData'), 'database.db')
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  console.log('-> Using database path:', dbPath)

  db = new DatabaseConstructor(dbPath)

  createSchema()
}

export function getDb(): Database {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.')
  return db
}

// ------------------------------------------
// Database schema creation
// ------------------------------------------
function createSchema(): void {
  const transaction = db.transaction(() => {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS Usuario (
        id_usuario TEXT PRIMARY KEY,
        total_kilos DECIMAL(10,2),
        total_puntos INTEGER,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `).run()

    db.prepare(`
      CREATE TABLE IF NOT EXISTS Material (
        id_material INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_material TEXT NOT NULL,
        demanda TEXT NOT NULL CHECK(demanda IN ('alta','media','baja')),
        calidad TEXT NOT NULL CHECK(calidad IN ('alta','media','baja')),
        ganancia DECIMAL(10,2) NOT NULL DEFAULT 0,
        borradoLogico INTEGER NOT NULL DEFAULT 0,
        fecha_creacion TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `).run()

    db.prepare(`
      CREATE TABLE IF NOT EXISTS Almacen (
        id_almacen INTEGER PRIMARY KEY AUTOINCREMENT,
        kilos_capacidad DECIMAL(10,2) NOT NULL DEFAULT 1,
        volumen_capacidad_m3 DECIMAL(10,2) NOT NULL DEFAULT 1,
        kilos_capacidad_actual DECIMAL(10,2) NOT NULL DEFAULT 1,
        volumen_capacidad_actual_m3 DECIMAL(10,2) NOT NULL DEFAULT 1
      );
    `).run()

    db.prepare(`
      CREATE TABLE IF NOT EXISTS Inventario (
        id_inventario INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario TEXT NOT NULL,
        id_material INTEGER NOT NULL,
        id_almacen INTEGER NOT NULL,
        kilos_almacenados DECIMAL(10,2) NOT NULL,
        volumen_almacenado_m3 DECIMAL(10,2) NOT NULL,
        factor_volumen_m3 DECIMAL(10,4) NOT NULL,
        presentacion TEXT NOT NULL CHECK(presentacion IN (
          'suelto','fardo','triturado','pellets','pulpa','cullet','fragmentado','polvo'
        )),
        borradoLogico INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
        FOREIGN KEY (id_material) REFERENCES Material(id_material),
        FOREIGN KEY (id_almacen) REFERENCES Almacen(id_almacen)
      );
    `).run()

    db.prepare(`
      CREATE TABLE IF NOT EXISTS Transaccion (
        id_transaccion INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario TEXT NOT NULL,
        id_registro INTEGER NOT NULL,
        fecha DATETIME NOT NULL,
        tabla TEXT CHECK(tabla IN ('material','inventario','comprador','venta')),
        FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
      );
    `).run()

    db.prepare(`
      CREATE TABLE IF NOT EXISTS Comprador (
        id_comprador INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT UNIQUE NOT NULL,
        distancia_km DECIMAL(10,2) NOT NULL,
        id_material INTEGER NOT NULL,
        precio_kg DECIMAL(10,2) NOT NULL,
        borradoLogico INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (id_material) REFERENCES Material(id_material)
      );
    `).run()

    db.prepare(`
      CREATE TABLE IF NOT EXISTS Venta (
        id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
        id_transaccion INTEGER NOT NULL,
        id_comprador INTEGER NOT NULL,
        kilos_vendidos DECIMAL(10,2) NOT NULL,
        entregado INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (id_transaccion) REFERENCES Transaccion(id_transaccion),
        FOREIGN KEY (id_comprador) REFERENCES Comprador(id_comprador)
      );
    `).run()

    db.prepare(`
      CREATE TABLE IF NOT EXISTS LogisticaEnvios (
        id_envio INTEGER PRIMARY KEY AUTOINCREMENT,
        id_venta INTEGER NOT NULL,
        fecha_salida DATETIME,
        fecha_entrega DATETIME,
        FOREIGN KEY (id_venta) REFERENCES Venta(id_venta)
      );
    `).run()
  })

  transaction()
}