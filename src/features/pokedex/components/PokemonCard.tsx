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
import { TYPE_COLORS } from "../constants/typeStyles";
import TypeBadge from "./TypeBadge";

// interface
interface Props {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 16 * 2 - 12) / 2;

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const mainType = pokemon.types[0];
  const accentColor = TYPE_COLORS[mainType] ?? "#A8A29E";

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <View style={styles.topArea}>
        <View style={styles.idPill}>
          <Text style={styles.idText}>{pokemon.id}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onToggleFavorite(pokemon.id)}
          style={styles.heart}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#EF4444" : "#374151"}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>

      <View style={styles.notchRow}>
        <View style={[styles.notchLeft, { borderTopColor: "#FFFFFF" }]} />
        <View style={[styles.notchRight, { borderTopColor: accentColor }]} />
      </View>

      <View style={[styles.bottomArea, { backgroundColor: accentColor }]}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <TypeBadge types={pokemon.types} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  topArea: {
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: "center",
  },
  idPill: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  idText: { fontSize: 12, fontWeight: "600", color: "#374151" },
  heart: { position: "absolute", top: 10, right: 10 },
  sprite: { width: "75%", height: 110, marginTop: 20 },
  notchRow: { flexDirection: "row", height: 16 },
  notchLeft: {
    flex: 1,
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  notchRight: {
    flex: 1,
    borderTopWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  bottomArea: {
    paddingTop: 4,
    paddingBottom: 16,
    alignItems: "center",
  },
  name: { fontSize: 17, fontWeight: "700", color: "#111827", marginBottom: 8 },
});
