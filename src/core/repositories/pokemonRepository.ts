import { getRawPokemon, getPokemonList } from "../api/pokeApiClient";
import { mapRawToPokemon } from "../mappers/pokemonMapper";
import { Pokemon } from "../models/Pokemon";

export interface PokemonRef {
  id: number;
  name: string;
}

// Interfaz del repositorio de pokemon
export interface PokemonRepository {
  getById(idOrName: number | string): Promise<Pokemon>;
  getByIds(ids: (number | string)[]): Promise<Pokemon[]>;
  getFirstN(count: number): Promise<Pokemon[]>;
  getAllRefs(): Promise<PokemonRef[]>;
  getBatch(ids: (number | string)[]): Promise<Pokemon[]>;
}

// Implementación del repositorio de pokemon usando la pokeApi
class PokeApiPokemonRepository implements PokemonRepository {
  async getById(idOrName: number | string): Promise<Pokemon> {
    const raw = await getRawPokemon(idOrName);
    return mapRawToPokemon(raw);
  }

  async getByIds(ids: (number | string)[]): Promise<Pokemon[]> {
    return Promise.all(ids.map((id) => this.getById(id)));
  }

  async getFirstN(count: number): Promise<Pokemon[]> {
    const ids = Array.from({ length: count }, (_, i) => i + 1);
    return this.getByIds(ids);
  }

  async getAllRefs(): Promise<PokemonRef[]> {
    const { results } = await getPokemonList(2000, 0);
    return results.map((r) => {
      const match = r.url.match(/\/pokemon\/(\d+)\//);
      return { id: match ? Number(match[1]) : 0, name: r.name };
    });
  }

  async getBatch(ids: (number | string)[]): Promise<Pokemon[]> {
    return this.getByIds(ids);
  }
}

// Instancia única que va a importar el resto de la app.
export const pokemonRepository: PokemonRepository =
  new PokeApiPokemonRepository();
