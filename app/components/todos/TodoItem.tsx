'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * 個々のTODOアイテムを表示するコンポーネント
 * @param todo - TODOアイテムのデータ
 * @param onToggle - 完了状態を切り替えるコールバック
 * @param onDelete - TODOを削除するコールバック
 */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(todo.id)}
      >
        削除
      </Button>
    </div>
  );
}
