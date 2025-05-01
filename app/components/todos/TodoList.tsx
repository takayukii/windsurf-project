'use client';

import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * TODOリストを表示するコンポーネント
 * @param todos - TODOアイテムの配列
 * @param onToggle - TODOの完了状態を切り替えるコールバック
 * @param onDelete - TODOを削除するコールバック
 */
export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
