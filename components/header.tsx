
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from './ui/icon-symbol';

export function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        TODO
      </ThemedText>
      <TouchableOpacity onPress={toggleColorScheme} accessibilityLabel="Toggle color scheme">
        <IconSymbol
          name={colorScheme === 'dark' ? 'sun.max.fill' : 'moon.fill'}
          size={24}
          color={colorScheme === 'dark' ? '#fff' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Adjusted for status bar
    paddingBottom: 20,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
    letterSpacing: 10,
  },
});
