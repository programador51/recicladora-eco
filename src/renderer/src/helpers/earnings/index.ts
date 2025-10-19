import { Pureza } from "../../molecules/QualityMaterialInput";

export function calcularGanancia(
  peso: number,
  precioBase: number,
  pureza: Pureza
): number {
  const factorPurezaMap: Record<Pureza, number> = {
    baja: 0.8,
    media: 1,
    alta: 1.2
  };

  const factor = factorPurezaMap[pureza] ?? 1;

  return peso * precioBase * factor;
}