/* este archivo tiene los estilos de los pokemon define su color y su icon correspondeinte por tipo */

import { PokemonType } from "../../../core/models/Pokemon";

// colores por tipo de pokemon
export const TYPE_COLORS: Record<PokemonType, string> = {
  Planta: "#18A64B",
  Fuego: "#EB3024",
  Agua: "#0784E7",
  Electrico: "#F4E411",
  Normal: "#EDEDE0",
  Lucha: "#DA4C1C",
  Siniestro: "#1C4A5F",
  Acero: "#9CA2A9",
  Dragon: "#CDB102",
  Hada: "#FF70FF",
  Bicho: "#9BCE2F",
  Volador: "#BCA5FA",
  Fantasma: "#6C3FC9",
  Psiquico: "#600e86",
  Roca: "#B17306",
  Tierra: "#E5BA60",
  Veneno: "#CF49E3",
  Hielo: "#88DCEB",
};

// colores de texto por tipo (para contraste sobre fondo del tipo)
export const TYPE_TEXT_COLORS: Record<PokemonType, string> = {
  Planta: "#FFFFFF",
  Fuego: "#FFFFFF",
  Agua: "#FFFFFF",
  Electrico: "#3A3A00",
  Normal: "#4B4B3F",
  Lucha: "#FFFFFF",
  Siniestro: "#FFFFFF",
  Acero: "#2A2A2A",
  Dragon: "#3A3300",
  Hada: "#5A0050",
  Bicho: "#2E3B00",
  Volador: "#2B215C",
  Fantasma: "#FFFFFF",
  Psiquico: "#FFFFFF",
  Roca: "#FFFFFF",
  Tierra: "#4A3400",
  Veneno: "#FFFFFF",
  Hielo: "#00424A",
};

// iconos por tipo de pokemon
export const TYPE_ICONS: Record<PokemonType, string> = {
  Planta: "🌿",
  Fuego: "🔥",
  Agua: "💧",
  Electrico: "⚡",
  Normal: "⚪",
  Veneno: "🧪",
  Fantasma: "👻",
  Volador: "🦅",
  Roca: "🧱",
  Hielo: "❄️",
  Dragon: "🐉",
  Psiquico: "👁️",
  Bicho: "🦗",
  Tierra: "🌍",
  Lucha: "🥊",
  Acero: "⚙️",
  Hada: "✨",
  Siniestro: "🌑",
};
