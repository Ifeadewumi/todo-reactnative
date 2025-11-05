import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from './ui/icon-symbol';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function TodoItem({ todo, onDelete, onToggle }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const updateDueDate = useMutation(api.todos.updateDueDate);

  const containerBackgroundColor = useThemeColor({ light: '#fff', dark: '#25273c' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const borderColor = useThemeColor({ light: '#e4e5f1', dark: '#36384f' }, 'background');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      updateDueDate({ id: todo._id, dueDate: selectedDate.toISOString().split('T')[0] });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: containerBackgroundColor, borderBottomColor: borderColor }]}>
      <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer} accessibilityLabel="Toggle todo">
        <View style={[styles.checkbox, todo.completed && styles.checked]}>
          {todo.completed && <IconSymbol name="checkmark" size={16} color="#fff" />}
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <ThemedText style={[styles.text, todo.completed && styles.completedText, { color: textColor }]}>
          {todo.text}
        </ThemedText>
        {todo.dueDate && <ThemedText style={styles.dueDate}>{todo.dueDate}</ThemedText>}
      </View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton} accessibilityLabel="Set due date">
        <IconSymbol name="calendar" size={18} color="#9798b1" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton} accessibilityLabel="Delete todo">
        <IconSymbol name="xmark" size={18} color="#9798b1" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9798b1',
  },
  dueDate: {
    fontSize: 12,
    color: '#9798b1',
  },
  dateButton: {
    marginLeft: 15,
  },
  deleteButton: {
    marginLeft: 15,
  },
});