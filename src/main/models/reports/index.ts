import PDFDocument from 'pdfkit'
import { getDb } from '../../db'

// Función para generar PDF y devolverlo como buffer
export function generateProfessionalReportPDF(): Promise<Buffer> {
  const db = getDb()

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30, size: 'A4' })
    const chunks: Buffer[] = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', (err) => reject(err))

    // --- Encabezado ---
    doc.fontSize(20).text('Reporte General de Materiales, Inventario, Ventas y Logística', {
      align: 'center',
      underline: true
    })
    doc.moveDown(2)

    // --- drawTable corregido ---
    const drawTable = (doc, headers, rows) => {
      // Encabezados
      headers.forEach(header => {
        doc.font('Helvetica-Bold').fontSize(10).text(header, { continued: true, width: 100 })
      })
      doc.text('') // Salto de línea

      // Filas
      rows.forEach(row => {
        headers.forEach(header => {
          const text = row[header] != null ? row[header].toString() : '-'
          doc.font('Helvetica').fontSize(10).text(text, { continued: true, width: 100 })
        })
        doc.text('') // Salto de línea

        // Salto de página automático
        if (doc.y > doc.page.height - 50) doc.addPage()
      })
      doc.moveDown(2)
    }

    // --- Material ---
    const materiales = db.prepare(
      'SELECT id_material, nombre_material, demanda, calidad, ganancia FROM Material WHERE borradoLogico = 0'
    ).all()
    doc.fontSize(14).text('Tabla: Material', { underline: true })
    drawTable(doc, ['id_material', 'nombre_material', 'demanda', 'calidad', 'ganancia'], materiales)

    // --- Inventario ---
    const inventarios = db.prepare(`
      SELECT i.id_inventario, u.id_usuario, m.nombre_material, i.kilos_almacenados, i.volumen_almacenado_m3, i.presentacion
      FROM Inventario i
      JOIN Usuario u ON i.id_usuario = u.id_usuario
      JOIN Material m ON i.id_material = m.id_material
      WHERE i.borradoLogico = 0
    `).all()
    doc.fontSize(14).text('Tabla: Inventario', { underline: true })
    drawTable(doc, [
      'id_inventario',
      'id_usuario',
      'nombre_material',
      'kilos_almacenados',
      'volumen_almacenado_m3',
      'presentacion'
    ], inventarios)

    // --- Venta ---
    const ventas = db.prepare(`
      SELECT v.id_venta, c.nombre AS comprador, v.kilos_vendidos, v.entregado
      FROM Venta v
      JOIN Comprador c ON v.id_comprador = c.id_comprador
    `).all()
    const ventasFormatted = ventas.map(v => ({
      id_venta: v.id_venta,
      comprador: v.comprador,
      kilos_vendidos: v.kilos_vendidos,
      entregado: v.entregado ? 'Sí' : 'No'
    }))
    doc.fontSize(14).text('Tabla: Venta', { underline: true })
    drawTable(doc, ['id_venta', 'comprador', 'kilos_vendidos', 'entregado'], ventasFormatted)

    // --- LogisticaEnvios ---
    const envios = db.prepare(`
      SELECT le.id_envio, v.id_venta, le.fecha_salida, le.fecha_entrega
      FROM LogisticaEnvios le
      JOIN Venta v ON le.id_venta = v.id_venta
    `).all()
    doc.fontSize(14).text('Tabla: LogisticaEnvios', { underline: true })
    drawTable(doc, ['id_envio', 'id_venta', 'fecha_salida', 'fecha_entrega'], envios)

    doc.end()
  })
}
