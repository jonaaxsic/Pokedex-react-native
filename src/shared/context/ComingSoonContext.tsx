import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, Image } from 'react-native';

interface ComingSoonContextValue {
  show: () => void;
}

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

export function ComingSoonProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1500);
  }, []);

  return (
    <ComingSoonContext.Provider value={{ show }}>
      {children}
      {visible && <ComingSoonToast />}
    </ComingSoonContext.Provider>
  );
}

export const useComingSoon = () => useContext(ComingSoonContext)!;

function ComingSoonToast() {
  const [opacity, setOpacity] = useState(0);

  React.useEffect(() => {
    const fadeIn = setTimeout(() => setOpacity(1), 50);
    return () => clearTimeout(fadeIn);
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        top: 80,
        alignSelf: 'center',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        opacity,
        zIndex: 9999,
        elevation: 9999,
        boxShadow: '0px 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      <Image
        source={require('../../../assets/images/icon.png')}
        style={{ width: 22, height: 22 }}
        resizeMode="contain"
      />
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
        Proximamente
      </Text>
    </View>
  );
}
