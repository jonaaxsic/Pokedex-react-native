import { useEffect, useState } from "react";
import { Pokemon } from "../../../core/models/Pokemon";
import { pokemonRepository } from "../../../core/repositories/pokemonRepository";

export function usePokemonList(ids: (number | string)[]) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    pokemonRepository
      .getByIds(ids)
      .then((result) => {
        if (isMounted) setPokemonList(result);
      })
      .catch((e) => {
        if (isMounted) setError(e.message ?? "Error al cargar Pokémon");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ids)]);

  return { pokemonList, loading, error };
}
