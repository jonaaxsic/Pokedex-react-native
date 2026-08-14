import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

// Props interface defines the expected props for the SearchBar component
interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#9CA3AF" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Buscar Pokémon..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginHorizontal: 16,
    marginVertical: 12,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
});
