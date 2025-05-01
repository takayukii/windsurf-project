'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
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
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="p-6 max-w-2xl mx-auto bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center">TODOリスト</h1>
          
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="新しいタスクを入力"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>追加</Button>
          </div>

          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                >
                  削除
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
