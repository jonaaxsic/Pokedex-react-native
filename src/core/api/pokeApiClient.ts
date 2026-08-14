const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export interface PokeApiRawResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string };
    };
  };
  types: { type: { name: string } }[];
}

export async function getRawPokemon(
  idOrName: number | string,
): Promise<PokeApiRawResponse> {
  const res = await fetch(`${BASE_URL}/${idOrName}`);
  if (!res.ok) {
    throw new Error(
      `No se pudo obtener el Pokémon "${idOrName}" (status ${res.status})`
    );
  }
  return res.json();
}
