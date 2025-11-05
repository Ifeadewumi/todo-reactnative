
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from './ui/icon-symbol';

export function TodoItem({ todo, onDelete, onToggle }) {
  const containerBackgroundColor = useThemeColor({ light: '#fff', dark: '#25273c' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const borderColor = useThemeColor({ light: '#e4e5f1', dark: '#36384f' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor: containerBackgroundColor, borderBottomColor: borderColor }]}>
      <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, todo.completed && styles.checked]}>
          {todo.completed && <IconSymbol name="checkmark" size={16} color="#fff" />}
        </View>
      </TouchableOpacity>
      <ThemedText style={[styles.text, todo.completed && styles.completedText, { color: textColor }]}>
        {todo.text}
      </ThemedText>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <IconSymbol name="xmark" size={18} color="#9798b1" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9798b1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#3a7bfd',
    borderColor: '#3a7bfd',
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9798b1',
  },
  deleteButton: {
    marginLeft: 15,
  },
});
