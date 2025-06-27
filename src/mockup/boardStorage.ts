interface Task {
  id: number
  title: string
  tags: string[]
}

interface Column {
  id: number
  name: string
  tasks: Task[]
}

interface Board {
  id: number
  name: string
  columns: Column[]
  members: string[]
}

const STORAGE_KEY = 'kanban-board'

export function loadBoards(): Board[] {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    try {
      return JSON.parse(data) as Board[]
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
  return []
}

export function saveBoards(boards: Board[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
}
