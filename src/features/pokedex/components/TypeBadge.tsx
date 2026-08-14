import { StyleSheet, Text, View } from "react-native";
import { PokemonType } from "../../../core/models/Pokemon";
import { TYPE_ICONS } from "../constants/typeStyles";

// interface que defina las propiedades que recibe el componente TypeBadge, desde pokemonType que es un array de tipos de pokemon, cada tipo tiene un nombre y un color
interface Props {
  types: PokemonType[];
}

// funcion que une a los  pokemon en un solo string, y se muestra en el badge, se obtine el icon del pokemon si no esta se pone un punto blanco
export default function TypeBadge({ types }: Props) {
  const label = types.join(" / "); // unimos los tipos de pokemon con una barra
  const icon = TYPE_ICONS[types[0]] ?? "⚪"; // si no existe ponemos un circulo blanco

  // retornamos una view con icon y el label , definiendo stylos
  return (
    <View style={styles.badge}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

// stilos para el badge , icon y label

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "center",
  },
  icon: {
    marginRight: 6,
    fontSize: 13,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
  },
});
