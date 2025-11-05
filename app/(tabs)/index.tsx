
import { ScreenLayout } from '@/components/screen-layout';
import { Header } from '@/components/header';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useState } from 'react';
import { TodoItem } from '@/components/todo-item';
import { TodoFooter } from '@/components/todo-footer';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function HomeScreen() {
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState('All');

  const todos = useQuery(api.todos.get);
  const addTodo = useMutation(api.todos.add);
  const updateTodo = useMutation(api.todos.update);
  const removeTodo = useMutation(api.todos.remove);
  const clearCompletedTodos = useMutation(api.todos.clearCompleted);

  const inputBackgroundColor = useThemeColor({ light: '#fff', dark: '#25273c' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;
    addTodo({ text: newTodoText });
    setNewTodoText('');
  };

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  if (todos === undefined) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <ScreenLayout>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackgroundColor, color: textColor }]}
          placeholder="Create a new todo..."
          placeholderTextColor="#9798b1"
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={handleAddTodo}
        />
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onDelete={() => removeTodo({ id: item._id })}
              onToggle={() => updateTodo({ id: item._id, completed: !item.completed })}
            />
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', color: textColor }}>No todos yet!</Text>}
        />
        <TodoFooter
          todos={todos}
          onClearCompleted={clearCompletedTodos}
          filter={filter}
          setFilter={setFilter}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
