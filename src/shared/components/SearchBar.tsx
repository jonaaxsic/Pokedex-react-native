import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TextInput,
  UIManager,
  View,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(true);
  };

  const handleBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(false);
  };

  const handleClear = () => {
    onChangeText("");
    inputRef.current?.focus();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
          ]}
          placeholder="Buscar Pokémon..."
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          selectionColor="#6B7280"
          {...Platform.select({ web: { outlineStyle: 'none', outlineColor: 'transparent' } })}
        />

        {/* Overlay de iconos — pointerEvents via style permite tocar el input debajo */}
        <View style={styles.iconsOverlay}>
          <View style={styles.leftIcon}>
            <Ionicons
              name="search"
              size={18}
              color={isFocused ? "#4B5563" : "#9CA3AF"}
            />
          </View>

          {value.length > 0 && (
            <View style={styles.rightIcon}>
              <Ionicons
                name="close-circle"
                size={18}
                color="#CBD5E1"
                onPress={handleClear}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: '#E2E6EC',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 15,
    color: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(160,170,190,0.5)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(160,170,190,0.4)',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255,255,255,0.8)',
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(255,255,255,0.6)',
    outlineWidth: 0,
  },
  inputFocused: {
    borderTopColor: 'rgba(120,130,145,0.6)',
    borderLeftColor: 'rgba(120,130,145,0.5)',
    borderBottomColor: 'rgba(230,235,240,0.9)',
    borderRightColor: 'rgba(230,235,240,0.7)',
  },
  iconsOverlay: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    pointerEvents: "box-none",
  },
  leftIcon: {
    marginLeft: 12,
    marginRight: "auto",
    height: "50%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    marginRight: 12,
    height: "50%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
