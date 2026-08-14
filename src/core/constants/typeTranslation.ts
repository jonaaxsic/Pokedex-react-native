// importar los tipos de pokemon desde el model
import { PokemonType } from "../models/Pokemon";

// exportar un objeto que tiene la traduccion de los tipos de pokemon del ingles al español
export const TYPE_TRANSLATION: Record<string, PokemonType> = {
  grass: "Planta",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  normal: "Normal",
  poison: "Veneno",
  ghost: "Fantasma",
  flying: "Volador",
  rock: "Roca",
  ice: "Hielo",
  dragon: "Dragón",
  psychic: "Psíquico",
  bug: "Bicho",
  ground: "Tierra",
  fighting: "Lucha",
  steel: "Acero",
  fairy: "Hada",
  dark: "Siniestro",
};
