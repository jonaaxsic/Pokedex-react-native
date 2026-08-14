/* este archivo tiene los estilos de los pokemon  define su color y su icon correspondeinte por tipo
 */

// importamos el modelo de Pokemon para definir los tipos de pokemon
import { PokemonType } from "../../../core/models/Pokemon";

// colores por tipo de pokemon
export const TYPE_COLORS: Record<PokemonType, string> = {
  Planta: "#18A64B",
  Fuego: "#EB3024",
  Agua: "#0784E7",
  Eléctrico: "#F4E411",
  Normal: "#EDEDE0",
  Lucha: "#DA4C1C",
  Siniestro: "#1C4A5F",
  Acero: "#9CA2A9",
  Dragón: "#CDB102",
  Hada: "#FF70FF",
  Bicho: "#9BCE2F",
  Volador: "#BCA5FA",
  Fantasma: "#6C3FC9",
  Psíquico: "#600e86",
  Roca: "#B17306",
  Tierra: "#E5BA60",
  Veneno: "#CF49E3",
  Hielo: "#88DCEB",
};

// iconos por tipo de pokemon
export const TYPE_ICONS: Record<PokemonType, string> = {
  Planta: "🌿",
  Fuego: "🔥",
  Agua: "💧",
  Eléctrico: "⚡",
  Normal: "⚪",
  Veneno: "🧪",
  Fantasma: "👻",
  Volador: "🦅",
  Roca: "🧱",
  Hielo: "❄️",
  Dragón: "🐉",
  Psíquico: "👁️",
  Bicho: "🦗",
  Tierra: "🌍",
  Lucha: "🥊",
  Acero: "⚙️",
  Hada: "✨",
  Siniestro: "🌑",
};
