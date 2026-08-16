import { searchPokemonRefs, normalizeSearchQuery, isNumericQuery } from '../src/features/pokedex/utils/searchPokemon';
import { PokemonRef } from '../src/core/repositories/pokemonRepository';

// Mock data: Pokémon de prueba
const MOCK_REFS: PokemonRef[] = [
  { id: 249, name: 'lugia' },
  { id: 1, name: 'bulbasaur' },
  { id: 4, name: 'charmander' },
  { id: 7, name: 'squirtle' },
  { id: 25, name: 'pikachu' },
  { id: 133, name: 'eevee' },
  { id: 94, name: 'gengar' },
  { id: 150, name: 'mewtwo' },
  { id: 480, name: 'uxie' },
  { id: 481, name: 'mesprit' },
  { id: 482, name: 'azelf' },
  { id: 135, name: 'jolteon' },
  { id: 134, name: 'vaporeon' },
  { id: 136, name: 'flareon' },
];

const CASE_INSENSITIVE_CASES = [
  { input: 'Lugia', expectedName: 'lugia' },
  { input: 'LUGIA', expectedName: 'lugia' },
  { input: 'luGiA', expectedName: 'lugia' },
  { input: 'PIKACHU', expectedName: 'pikachu' },
  { input: 'Bulbasaur', expectedName: 'bulbasaur' },
  { input: 'EEVEE', expectedName: 'eevee' },
];

describe('normalizeSearchQuery', () => {
  it('elimina espacios al inicio y final', () => {
    expect(normalizeSearchQuery('  pikachu  ')).toBe('pikachu');
  });

  it('convierte a minúsculas', () => {
    expect(normalizeSearchQuery('PIKACHU')).toBe('pikachu');
    expect(normalizeSearchQuery('Lugia')).toBe('lugia');
  });

  it('elimina # al inicio', () => {
    expect(normalizeSearchQuery('#249')).toBe('249');
    expect(normalizeSearchQuery('# 249')).toBe('249');
  });

  it('elimina ceros a la izquierda', () => {
    expect(normalizeSearchQuery('0249')).toBe('249');
    expect(normalizeSearchQuery('001')).toBe('1');
    expect(normalizeSearchQuery('00025')).toBe('25');
  });

  it('maneja combinación de #, ceros y espacios', () => {
    expect(normalizeSearchQuery('  #0249  ')).toBe('249');
  });

  it('retorna string vacío si solo hay espacios', () => {
    expect(normalizeSearchQuery('   ')).toBe('');
  });
});

describe('isNumericQuery', () => {
  it('retorna true para números', () => {
    expect(isNumericQuery('1')).toBe(true);
    expect(isNumericQuery('249')).toBe(true);
    expect(isNumericQuery('480')).toBe(true);
  });

  it('retorna false para texto', () => {
    expect(isNumericQuery('pikachu')).toBe(false);
    expect(isNumericQuery('lugia')).toBe(false);
  });

  it('retorna false para mezcla de números y texto', () => {
    expect(isNumericQuery('25pika')).toBe(false);
  });
});

describe('searchPokemonRefs', () => {
  describe('búsqueda por nombre', () => {
    it('encuentra por nombre exacto', () => {
      const result = searchPokemonRefs(MOCK_REFS, 'pikachu');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('pikachu');
    });

    it('encuentra por nombre parcial', () => {
      const result = searchPokemonRefs(MOCK_REFS, 'pika');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('pikachu');
    });

    CASE_INSENSITIVE_CASES.forEach(({ input, expectedName }) => {
      it(`case-insensitive: "${input}" → ${expectedName}`, () => {
        const result = searchPokemonRefs(MOCK_REFS, input);
        expect(result.some((r) => r.name === expectedName)).toBe(true);
      });
    });

    it('encuentra múltiples resultados por nombre parcial', () => {
      const result = searchPokemonRefs(MOCK_REFS, 'e');
      expect(result.length).toBeGreaterThan(1);
    });

    it('retorna vacío si no hay coincidencia', () => {
      const result = searchPokemonRefs(MOCK_REFS, 'zzzz');
      expect(result).toHaveLength(0);
    });
  });

  describe('búsqueda por número', () => {
    it('encuentra por número exacto', () => {
      const result = searchPokemonRefs(MOCK_REFS, '249');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(249);
      expect(result[0].name).toBe('lugia');
    });

    it('encuentra por número sin #', () => {
      const result = searchPokemonRefs(MOCK_REFS, '25');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(25);
      expect(result[0].name).toBe('pikachu');
    });

    it('ignora # al inicio', () => {
      const result = searchPokemonRefs(MOCK_REFS, '#249');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('lugia');
    });

    it('elimina ceros a la izquierda', () => {
      const result = searchPokemonRefs(MOCK_REFS, '025');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('pikachu');
    });

    it('encuentra por número parcial', () => {
      const result = searchPokemonRefs(MOCK_REFS, '48');
      expect(result.length).toBe(3);
      expect(result.map((r) => r.id)).toEqual(
        expect.arrayContaining([480, 481, 482])
      );
    });

    it('encuentra por dígito parcial', () => {
      const result = searchPokemonRefs(MOCK_REFS, '13');
      expect(result.length).toBe(4);
    });

    it('número exacto tiene prioridad sobre parcial', () => {
      const result = searchPokemonRefs(MOCK_REFS, '150');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(150);
      expect(result[0].name).toBe('mewtwo');
    });
  });

  describe('búsqueda combinada (nombre y número)', () => {
    it('no mezcla resultados de nombre y número', () => {
      const result = searchPokemonRefs(MOCK_REFS, '25');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(25);
    });
  });

  describe('edge cases', () => {
    it('query vacío retorna array vacío', () => {
      const result = searchPokemonRefs(MOCK_REFS, '');
      expect(result).toHaveLength(0);
    });

    it('query con solo espacios retorna array vacío', () => {
      const result = searchPokemonRefs(MOCK_REFS, '   ');
      expect(result).toHaveLength(0);
    });

    it('query con solo # retorna array vacío', () => {
      const result = searchPokemonRefs(MOCK_REFS, '#');
      expect(result).toHaveLength(0);
    });

    it('número grande fuera de rango', () => {
      const result = searchPokemonRefs(MOCK_REFS, '9999');
      expect(result).toHaveLength(0);
    });
  });
});
