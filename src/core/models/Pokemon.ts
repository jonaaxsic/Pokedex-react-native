// tipos de pokemon
export type PokemonType =
  | "Planta"
  | "Fuego"
  | "Agua"
  | "Eléctrico"
  | "Normal"
  | "Veneno"
  | "Fantasma"
  | "Volador"
  | "Roca"
  | "Hielo"
  | "Dragón"
  | "Psíquico"
  | "Bicho"
  | "Tierra"
  | "Lucha"
  | "Acero"
  | "Hada"
  | "Siniestro";

// interface de los pokemon
export interface Pokemon {
  id: string;
  name: string;
  types: PokemonType[];
  image: string;
}
