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
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
  height: number;
  weight: number;
}

export async function getRawPokemon(
  idOrName: number | string,
): Promise<PokeApiRawResponse> {
  const res = await fetch(`${BASE_URL}/${idOrName}`);
  if (!res.ok) {
    throw new Error(
      `No se pudo obtener el Pokemon "${idOrName}" (status ${res.status})`
    );
  }
  return res.json();
}
