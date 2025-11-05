import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function TodoFooter({ todos, onClearCompleted }) {
  const textColor = useThemeColor({ light: '#9798b1', dark: '#5b5e7e' }, 'text');

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <View style={styles.container}>
      <ThemedText style={{ color: textColor }}>{activeCount} items left</ThemedText>
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
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderTopColor: '#e4e5f1',
  },
});