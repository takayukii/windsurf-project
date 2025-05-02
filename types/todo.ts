export interface Todo {
  id: number
  title: string
  description?: string | null
  completed: boolean
  priority: number
  category?: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateTodoInput {
  title: string
  description?: string
  priority?: number
  category?: string
}
