
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function TodoFooter({ todos, onClearCompleted, filter, setFilter }) {
  const containerBackgroundColor = useThemeColor({ light: '#fff', dark: '#25273c' }, 'background');
  const textColor = useThemeColor({ light: '#9798b1', dark: '#5b5e7e' }, 'text');

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <View style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      <ThemedText style={{ color: textColor }}>{activeCount} items left</ThemedText>
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setFilter('All')} accessibilityLabel="Filter for all todos">
          <ThemedText style={[styles.filter, filter === 'All' && styles.activeFilter]}>All</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Active')} accessibilityLabel="Filter for active todos">
          <ThemedText style={[styles.filter, { color: textColor }, filter === 'Active' && styles.activeFilter]}>Active</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Completed')} accessibilityLabel="Filter for completed todos">
          <ThemedText style={[styles.filter, { color: textColor }, filter === 'Completed' && styles.activeFilter]}>Completed</ThemedText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onClearCompleted} accessibilityLabel="Clear completed todos">
        <ThemedText style={{ color: textColor }}>Clear Completed</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  filters: {
    flexDirection: 'row',
  },
  filter: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  activeFilter: {
    color: '#3a7bfd',
  },
});
