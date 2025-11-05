
import { ScreenLayout } from '@/components/screen-layout';
import { Header } from '@/components/header';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useState } from 'react';
import { TodoItem } from '@/components/todo-item';
import { TodoFooter } from '@/components/todo-footer';
import { FilterBar } from '@/components/filter-bar';
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
  const listBackgroundColor = useThemeColor({ light: '#fff', dark: '#25273c' }, 'background');
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
    return (
      <ScreenLayout>
        <ActivityIndicator style={{ flex: 1 }} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.content}>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackgroundColor, color: textColor }]}
            placeholder="Create a new todo..."
            placeholderTextColor="#9798b1"
            value={newTodoText}
            onChangeText={setNewTodoText}
            onSubmitEditing={handleAddTodo}
          />

          <View style={[styles.listContainer, { backgroundColor: listBackgroundColor }]}>
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
              ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 20, color: textColor }}>No todos yet!</Text>}
              ListFooterComponent={<TodoFooter todos={todos || []} onClearCompleted={clearCompletedTodos} />}
            />
          </View>

          <FilterBar filter={filter} setFilter={setFilter} />
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    height: 55,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 25, // Adjust as needed
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  listContainer: {
    flex: 1,
    marginTop: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 30,
  },
});
