import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Pokemon } from "../../../core/models/Pokemon";
import { TYPE_COLORS, TYPE_TEXT_COLORS } from "../constants/typeStyles";
import TypeBadge from "./TypeBadge";

interface Props {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress?: () => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 20 * 2 - 16) / 2;

/** Oscurece un color hex #RRGGBB por un porcentaje (0–1) */
function darken(hex: string, amount: number): string {
  const raw = hex.replace("#", "");
  const r = Math.max(0, parseInt(raw.substring(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(raw.substring(2, 4), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(raw.substring(4, 6), 16) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onPress,
}: Props) {
  const mainType = pokemon.types[0];
  const accentColor = TYPE_COLORS[mainType] ?? "#A8A29E";
  const textColor = TYPE_TEXT_COLORS[mainType] ?? "#FFFFFF";
  const hoverColor = darken(accentColor, 0.12);
  const pressedColor = darken(accentColor, 0.22);

  return (
    <Pressable
      style={({ hovered, pressed }) => [
        styles.card,
        { backgroundColor: accentColor },
        hovered && { backgroundColor: hoverColor, ...styles.cardHovered },
        pressed && { backgroundColor: pressedColor, ...styles.cardPressed },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Pokemon ${pokemon.name}, tipo ${pokemon.types.join(', ')}`}
      accessibilityHint="Toca para ver detalles"
      accessibilityState={{ selected: isFavorite }}
    >
      {/* Top area - imagen y detalles */}
      <View style={styles.topArea}>
        {/* ID pill */}
        <View style={styles.idPill}>
          <Text style={[styles.idText, { color: textColor }]}>{pokemon.id}</Text>
        </View>

        {/* Heart */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation?.();
            onToggleFavorite(pokemon.id);
          }}
          style={styles.heart}
          accessibilityRole="togglebutton"
          accessibilityLabel={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
          accessibilityState={{ checked: isFavorite }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite ? "#EF4444" : textColor}
          />
        </Pressable>

        {/* Pokemon image */}
        <Image
          source={{ uri: pokemon.image }}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>

      {/* Bottom area - nombre y tipo */}
      <View style={styles.bottomArea}>
        <Text style={[styles.name, { color: textColor }]}>{pokemon.name}</Text>
        <TypeBadge types={pokemon.types} textColor={textColor} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.08), 0px 8px 24px rgba(0,0,0,0.12)',
    elevation: 6,
  },
  cardHovered: {
    boxShadow: '0px 4px 12px rgba(0,0,0,0.12), 0px 12px 32px rgba(0,0,0,0.18)',
  },
  cardPressed: {
    boxShadow: '0px 1px 4px rgba(0,0,0,0.06), 0px 4px 12px rgba(0,0,0,0.1)',
  },
  topArea: {
    paddingTop: 10,
    paddingBottom: 12,
    alignItems: "center",
  },
  idPill: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  idText: {
    fontSize: 11,
    fontWeight: "600",
  },
  heart: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  sprite: {
    width: "70%",
    height: 100,
    marginTop: 16,
  },
  bottomArea: {
    paddingTop: 6,
    paddingBottom: 14,
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "capitalize",
  },
});
