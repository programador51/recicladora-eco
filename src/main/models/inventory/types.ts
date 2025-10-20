// Define the TypeScript interface for a record
export interface InventarioInput {
  id_usuario: string
  id_material: number
  id_almacen: number
  kilos_almacenados: number
  volumen_almacenado_m3: number
  factor_volumen_m3: number
  presentacion:
    | "suelto"
    | "fardo"
    | "triturado"
    | "pellets"
    | "pulpa"
    | "cullet"
    | "fragmentado"
    | "polvo"
  borradoLogico?: number
}
