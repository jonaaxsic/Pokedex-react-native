import { getRawPokemon } from "../api/pokeApiClient";
import { mapRawToPokemon } from "../mappers/pokemonMapper";
import { Pokemon } from "../models/Pokemon";

// Interfaz del repositorio de pokemon
export interface PokemonRepository {
  // obtiene un pokemon por su id o nombre
  getById(idOrName: number | string): Promise<Pokemon>;
  getByIds(ids: (number | string)[]): Promise<Pokemon[]>;
  getFirstN(count: number): Promise<Pokemon[]>;
}

// Implementación del repositorio de pokemon usando la pokeApi
class PokeApiPokemonRepository implements PokemonRepository {
  async getById(idOrName: number | string): Promise<Pokemon> {
    const raw = await getRawPokemon(idOrName);
    return mapRawToPokemon(raw);
  }
  // obtiene varios pokemon por sus ids o nombres
  async getByIds(ids: (number | string)[]): Promise<Pokemon[]> {
    return Promise.all(ids.map((id) => this.getById(id)));
  }
  // obtiene los primeros n pokemon
  async getFirstN(count: number): Promise<Pokemon[]> {
    const ids = Array.from({ length: count }, (_, i) => i + 1);
    return this.getByIds(ids);
  }
}

// Instancia única que va a importar el resto de la app.
export const pokemonRepository: PokemonRepository =
  new PokeApiPokemonRepository();
