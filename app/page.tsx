'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TodoForm } from '@/components/todos/TodoForm';
import { TodoList } from '@/components/todos/TodoList';
import { Todo } from '@/types/todo';

/**
 * TODOアプリケーションのメインページコンポーネント
 * TODOの状態管理と、TodoFormとTodoListの統合を行う
 */
export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="min-h-screen p-8 bg-background">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">TODOアプリ</h1>
        <TodoForm onSubmit={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </Card>
    </main>
  );
}
