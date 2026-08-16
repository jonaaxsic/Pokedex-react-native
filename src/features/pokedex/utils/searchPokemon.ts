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
 * - Nombre: coincidencia parcial, case-insensitive (ej: "lugia", "pika")
 * - Número: coincidencia exacta o parcial (ej: "249", "24", "9")
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

  const isNumber = isNumericQuery(q);

  return refs.filter((r) => {
    // Búsqueda por nombre (siempre case-insensitive, coincidencia parcial)
    if (r.name.toLowerCase().includes(q)) {
      return true;
    }

    // Búsqueda por número
    if (isNumber) {
      const pokemonId = r.id.toString();
      // Coincidencia exacta: "249" === "249"
      if (pokemonId === q) {
        return true;
      }
      // Coincidencia parcial: "24" coincide con "249", "240", "124", etc.
      if (pokemonId.includes(q)) {
        return true;
      }
    }

    return false;
  });
}
