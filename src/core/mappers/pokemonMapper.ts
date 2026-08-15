// transformar la respuesta cruda al modelo pokemon

import { PokeApiRawResponse } from "../api/pokeApiClient";
import { TYPE_TRANSLATION } from "../constants/typeTranslation";
import { Pokemon, PokemonType } from "../models/Pokemon";

// funcion que da formato y devuelve un objeto de tipo Pokemon
function formatId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const STAT_NAME_MAP: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque Esp.",
  "special-defense": "Defensa Esp.",
  speed: "Velocidad",
};

export function mapRawToPokemon(raw: PokeApiRawResponse): Pokemon {
  const types: PokemonType[] = raw.types.map(
    (t) =>
      TYPE_TRANSLATION[t.type.name] ?? (capitalize(t.type.name) as PokemonType),
  );

  const stats = raw.stats.map((s) => ({
    name: STAT_NAME_MAP[s.stat.name] ?? s.stat.name,
    value: s.base_stat,
  }));

  const moves = raw.moves.slice(0, 15).map((m) => ({
    name: capitalize(m.move.name.replace(/-/g, " ")),
  }));

  return {
    id: formatId(raw.id),
    rawId: raw.id,
    name: capitalize(raw.name),
    types,
    image: raw.sprites.other["official-artwork"].front_default,
    stats,
    moves,
    height: raw.height / 10, // decametros a metros
    weight: raw.weight / 10, // hectogramos a kg
  };
}
