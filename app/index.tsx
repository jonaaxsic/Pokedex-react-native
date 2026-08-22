import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  return (
    <View style={s.bg}>
      <Image
        source={require("../assets/images/pokedex-ui/android-icon-background.jpg")}
        style={[s.bgImage, { width, height }]}
        resizeMode="cover"
      />
      <SafeAreaView style={s.safe} edges={["top", "bottom"]}>
        <View style={s.inner}>
          <View style={s.topSection}>
            <Image
              source={require("../assets/images/pokedex-ui/new-title.png")}
              style={[s.logo, { width: width * 0.99 }]}
              resizeMode="contain"
            />
          </View>

          <View style={s.pokedexLabel}>
            <Image
              source={require("../assets/images/icon.png")}
              style={s.pokedexLabelIcon}
              resizeMode="contain"
            />
            <Text style={s.pokedexLabelText}>POKÉDEX</Text>
          </View>

          <View style={s.heroSection}>
            <Image
              source={require("../assets/images/pokedex-ui/pokedex-device.png")}
              style={[
                s.pokedexImage,
                { width: width * 0.75, height: width * 0.65 },
              ]}
              resizeMode="contain"
            />
          </View>

          <View style={s.bottomSection}>
            <Text style={s.headline}>Descúbrelos a todos</Text>
            <Text style={s.sub}>Explora, descubre y complecta tu Pokédex.</Text>
            <Pressable
              style={({ hovered, pressed }) => [
                s.btn,
                hovered && s.btnHover,
                pressed && s.btnPressed,
              ]}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={s.btnText}>COMENZAR</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
  },
  bgImage: {
    ...StyleSheet.absoluteFill,
    transform: [{ scale: 1.25 }, { translateY: 100 }],
  },
  safe: {
    flex: 1,
    elevation: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
    paddingBottom: 24,
  },
  topSection: {
    alignItems: "center",
    paddingTop: 3,
  },
  logo: {},

  pokedexLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(232,236,241,0.7)",
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: -30,
    marginBottom: 16,
  },
  pokedexLabelIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  pokedexLabelText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#374151",
    letterSpacing: 3,
  },

  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 260,
  },
  pokedexImage: {},
  bottomSection: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  headline: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  btn: {
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderTopWidth: 2,
    borderTopColor: "rgba(255,255,255,0.45)",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(120,20,20,0.65)",
  },
  btnHover: {
    backgroundColor: "#DC2626",
    transform: [{ translateY: -2 }],
  },
  btnPressed: {
    backgroundColor: "#B91C1C",
    transform: [{ translateY: 2 }],
  },
  btnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1.5,
  },
});
