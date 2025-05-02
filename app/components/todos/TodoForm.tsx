'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TodoFormProps {
  onSubmit: (text: string) => void;
}

/**
 * 新しいTODOを追加するためのフォームコンポーネント
 * @param onSubmit - フォーム送信時のコールバック
 */
export function TodoForm({ onSubmit }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onSubmit(newTodo);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="新しいタスクを入力"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button type="submit">
        追加
      </Button>
    </form>
  );
}
