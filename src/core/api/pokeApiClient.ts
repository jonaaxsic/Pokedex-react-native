// responsabilidad unica de hacer fetch a la pokeApi nada de trasnformar datos, solo traerlos

// const para
const BASE_URL = "https://pokeapi.co/api/v2/";

// interface de la respuesta
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

// fecth crudo a la pokeApi sin transformar nada
export async function getRawPokemon(
  idOrName: number | string,
): Promise<PokeApiRawResponse> {
  // fetch a la pokeApi
  const res = await fetch(`${BASE_URL}/${idOrName}`);
  // si la respuesta no es ok, lanza un error con el status
  if (!res.ok) {
    throw new Error(
      ` No se puede obtener el Pokemon "${idOrName}" (status: ${res.status})`,
    );
  }
  // retorna la respuesta en formato json
  return res.json();
}
