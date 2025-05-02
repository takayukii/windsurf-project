'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TodoForm } from './components/TodoForm';
import { Todo, CreateTodoInput } from '@/types/todo';

function getPriorityLabel(priority: number): string {
  switch (priority) {
    case 3:
      return '高';
    case 2:
      return '中';
    default:
      return '低';
  }
}

function getPriorityColor(priority: number): string {
  switch (priority) {
    case 3:
      return 'bg-red-100 text-red-800';
    case 2:
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-green-100 text-green-800';
  }
}

async function fetchTodos() {
  const response = await fetch('/api/todos');
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

async function createTodo(todo: CreateTodoInput) {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(err => setError(err.message));
  }, []);

  const handleSubmit = async (todoInput: CreateTodoInput) => {
    try {
      const newTodo = await createTodo(todoInput);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      setTodos(todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');

      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="p-6 max-w-2xl mx-auto bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center">TODOリスト</h1>
          
          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-6">
            <TodoForm onSubmit={handleSubmit} />
          </div>

          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <div className="flex-1">
                  <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>
                      {todo.description}
                    </p>
                  )}
                  {todo.category && (
                    <span className="text-xs text-gray-500">
                      {todo.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(todo.priority)}`}>
                    {getPriorityLabel(todo.priority)}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    削除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
