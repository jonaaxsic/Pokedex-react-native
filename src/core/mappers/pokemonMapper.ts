// trasnformar la respuesta cruda al modelo pokemon

import { PokeApiRawResponse } from "../api/pokeApiClient";
import { TYPE_TRANSLATION } from "../constants/typeTranslation";
import { Pokemon, PokemonType } from "../models/Pokemon";
// funcion que da formato y devulve un objeto de tipo Pokemon a partir de la respuesta cruda de la pokeApi
function formatId(id: number): string {
  // formatea el id a 3 digitos con ceros a la izquierda y le agrega un # al inicio
  return `#${String(id).padStart(3, "0")}`;
}

// funcion capitalize que recibe un string y devuelve el mismo string con la primera letra en mayuscula
function capitalize(str: string): string {
  // convierte la primera letra a mayuscula y concatena el resto del string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function mapRawToPokemon(raw: PokeApiRawResponse): Pokemon {
  const types: PokemonType[] = raw.types.map(
    (t) =>
      TYPE_TRANSLATION[t.type.name] ?? (capitalize(t.type.name) as PokemonType),
  );

  return {
    id: formatId(raw.id),
    name: capitalize(raw.name),
    types,
    image: raw.sprites.other["official-artwork"].front_default,
  };
}
