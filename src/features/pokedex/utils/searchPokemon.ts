import { PokemonRef } from '../../../core/repositories/pokemonRepository';

/**
 * Normaliza el query de búsqueda: elimina #, espacios, y convierte a minúsculas.
 * Soporta: "lugia", "Lugia", "#249", "249", "  0249  "
 */
export function normalizeSearchQuery(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^#+\s*/, '') // elimina # y espacios después
    .replace(/^0+/, ''); // elimina ceros a la izquierda
}

/**
 * Verifica si un query es un número de Pokémon (después de normalizar).
 */
export function isNumericQuery(normalized: string): boolean {
  return /^\d+$/.test(normalized);
}

/**
 * Busca Pokémon por nombre o número en la lista de refs.
 * - Nombre: coincidencia parcial, case-insensitive (ej: "lugia", "pika"), máximo 30 resultados
 * - Número: la coincidencia EXACTA tiene prioridad (ej: "25" devuelve solo #25).
 *   Sin coincidencia exacta y con 2+ dígitos, devuelve coincidencias parciales
 *   (ej: "24" coincide con "249", "240", "124", etc.), máximo 10 resultados.
 *   Queries numéricos de 1 dígito sin coincidencia exacta devuelven [].
 *
 * @param refs - Lista de Pokémon disponibles (nombre + id)
 * @param rawQuery - Query del usuario sin normalizar
 * @returns Array de PokemonRef que coinciden
 */
export function searchPokemonRefs(
  refs: PokemonRef[],
  rawQuery: string
): PokemonRef[] {
  const q = normalizeSearchQuery(rawQuery);

  if (!q) {
    return [];
  }

  const sorted = [...refs].sort((a, b) => a.id - b.id);

  if (isNumericQuery(q)) {
    const exact = sorted.find((r) => r.id.toString() === q);
    if (exact) {
      return [exact];
    }

    if (q.length < 2) {
      return [];
    }

    return sorted
      .filter((r) => r.id.toString().includes(q))
      .slice(0, 10);
  }

  return sorted
    .filter((r) => r.name.toLowerCase().includes(q))
    .slice(0, 30);
}
