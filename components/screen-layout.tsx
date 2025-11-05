
import { useThemeColor } from '@/hooks/use-theme-color';
import { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export function ScreenLayout({ children }: { children: ReactNode }) {
  const backgroundColor = useThemeColor({ light: '#fafafa', dark: '#181824' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
