// tipos de pokemon
export type PokemonType =
  | "Planta"
  | "Fuego"
  | "Agua"
  | "Electrico"
  | "Normal"
  | "Veneno"
  | "Fantasma"
  | "Volador"
  | "Roca"
  | "Hielo"
  | "Dragon"
  | "Psiquico"
  | "Bicho"
  | "Tierra"
  | "Lucha"
  | "Acero"
  | "Hada"
  | "Siniestro";

// stats de pokemon
export interface PokemonStat {
  name: string;
  value: number;
}

// movimiento de pokemon
export interface PokemonMove {
  name: string;
}

// interface de los pokemon
export interface Pokemon {
  id: string;
  rawId: number;
  name: string;
  types: PokemonType[];
  image: string;
  stats: PokemonStat[];
  moves: PokemonMove[];
  height: number;
  weight: number;
}
