
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function FilterBar({ filter, setFilter }) {
  const containerBackgroundColor = useThemeColor({ light: '#fff', dark: '#25273c' }, 'background');
  const textColor = useThemeColor({ light: '#9798b1', dark: '#5b5e7e' }, 'text');
  const activeColor = '#3a7bfd';

  return (
    <View style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      <TouchableOpacity onPress={() => setFilter('All')} accessibilityLabel="Filter for all todos">
        <ThemedText style={[styles.filter, { color: filter === 'All' ? activeColor : textColor }]}>All</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter('Active')} accessibilityLabel="Filter for active todos">
        <ThemedText style={[styles.filter, { color: filter === 'Active' ? activeColor : textColor }]}>Active</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter('Completed')} accessibilityLabel="Filter for completed todos">
        <ThemedText style={[styles.filter, { color: filter === 'Completed' ? activeColor : textColor }]}>Completed</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filter: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
