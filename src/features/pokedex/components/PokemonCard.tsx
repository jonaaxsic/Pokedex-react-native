import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
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
const CARD_WIDTH = (width - 16 * 2 - 12) / 2;

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onPress,
}: Props) {
  const mainType = pokemon.types[0];
  const accentColor = TYPE_COLORS[mainType] ?? "#A8A29E";
  const textColor = TYPE_TEXT_COLORS[mainType] ?? "#FFFFFF";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Top area - imagen y detalles */}
      <View style={styles.topArea}>
        {/* ID pill */}
        <View style={styles.idPill}>
          <Text style={styles.idText}>{pokemon.id}</Text>
        </View>

        {/* Heart */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation?.();
            onToggleFavorite(pokemon.id);
          }}
          style={styles.heart}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>

        {/* Pokemon image */}
        <Image
          source={{ uri: pokemon.image }}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>

      {/* Bottom area - nombre y tipo */}
      <View style={[styles.bottomArea, { backgroundColor: accentColor }]}>
        <Text style={[styles.name, { color: textColor }]}>{pokemon.name}</Text>
        <TypeBadge types={pokemon.types} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F8F9FB",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  topArea: {
    backgroundColor: "#F8F9FB",
    paddingTop: 10,
    paddingBottom: 16,
    alignItems: "center",
  },
  idPill: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  idText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
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
