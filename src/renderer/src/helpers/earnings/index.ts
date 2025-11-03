import { Earn } from '@renderer/atoms/EarningItem/types'
import { Pureza } from '../../molecules/QualityMaterialInput'

export function calcularGanancia(peso: number, precioBase: number, pureza: Pureza): number {
  const factorPurezaMap: Record<Pureza, number> = {
    baja: 0.8,
    media: 1,
    alta: 1.2
  }

  const factor = factorPurezaMap[pureza] ?? 1

  return peso * precioBase * factor
}

/**
 * Calcula un impacto ambiental estimado a partir de los materiales reciclados.
 * @param data - Array de objetos con earning y material
 * @returns Totales de impacto ambiental
 */
export function calcularImpacto(data: Earn[]): {
  arboles: number
  agua: number
  energia: number
  co2: number
} {
  // Valores base por unidad (dummy / estimados)
  const factores = {
    pet: { arboles: 0.05, agua: 300, energia: 150, co2: 120 },
    carton: { arboles: 0.3, agua: 500, energia: 250, co2: 200 },
    aluminio: { arboles: 0.1, agua: 200, energia: 1000, co2: 900 },
    'vidrio verde': { arboles: 0.02, agua: 100, energia: 80, co2: 70 },
    'plastico duro': { arboles: 0.04, agua: 250, energia: 120, co2: 100 }
  }

  // Totales acumulados
  const total = {
    arboles: 0,
    agua: 0,
    energia: 0,
    co2: 0
  }

  // Recorre cada registro y acumula su impacto
  for (const item of data) {
    const f = factores[item.material.toLowerCase()]
    if (!f) continue // si el material no está definido, lo ignora

    // multiplicamos por earning (supón que representa kilos, pesos o puntos)
    total.arboles += f.arboles * item.earning
    total.agua += f.agua * item.earning
    total.energia += f.energia * item.earning
    total.co2 += f.co2 * item.earning
  }

  // Redondeamos para mejor presentación
  return {
    arboles: parseFloat(total.arboles.toFixed(2)),
    agua: Math.round(total.agua),
    energia: Math.round(total.energia),
    co2: Math.round(total.co2)
  }
}
