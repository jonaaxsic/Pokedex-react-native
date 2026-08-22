import { getRawPokemon, getPokemonList } from "../api/pokeApiClient";
import { mapRawToPokemon } from "../mappers/pokemonMapper";
import { Pokemon } from "../models/Pokemon";

export interface PokemonRef {
  id: number;
  name: string;
}

function isImportantForm(name: string, id: number): boolean {
  if (id <= 1025) {
    return true;
  }
  if (name.includes('mega')) {
    return true;
  }
  if (name.includes('gigantamax')) {
    return true;
  }
  return (
    name.endsWith('-alola') ||
    name.endsWith('-galar') ||
    name.endsWith('-hisui') ||
    name.endsWith('-paldea')
  );
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
    return this.mapWithConcurrency(ids, 8, (id) => this.getById(id));
  }

  private async mapWithConcurrency<T>(
    items: T[],
    limit: number,
    fn: (item: T) => Promise<Pokemon>
  ): Promise<Pokemon[]> {
    const results = new Array<Pokemon>(items.length);
    let nextIndex = 0;

    async function worker(): Promise<void> {
      while (nextIndex < items.length) {
        const index = nextIndex;
        nextIndex += 1;
        results[index] = await fn(items[index]);
      }
    }

    const workers = Array.from(
      { length: Math.min(limit, items.length) },
      () => worker()
    );
    await Promise.all(workers);
    return results;
  }

  async getFirstN(count: number): Promise<Pokemon[]> {
    const ids = Array.from({ length: count }, (_, i) => i + 1);
    return this.getByIds(ids);
  }

  async getAllRefs(): Promise<PokemonRef[]> {
    const { results } = await getPokemonList(2000, 0);
    return results
      .map((r) => {
        const match = r.url.match(/\/pokemon\/(\d+)\//);
        return { id: match ? Number(match[1]) : 0, name: r.name };
      })
      .filter((r) => isImportantForm(r.name, r.id));
  }

  async getBatch(ids: (number | string)[]): Promise<Pokemon[]> {
    return this.getByIds(ids);
  }
}

// Instancia única que va a importar el resto de la app.
export const pokemonRepository: PokemonRepository =
  new PokeApiPokemonRepository();
