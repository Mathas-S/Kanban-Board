<template>
  <div class="board-container">
    <h1>Your Boards</h1>

    <div class="boards-list">
      <BoardCard
        v-for="board in boards"
        :key="board.id"
        :board="board"
        :selectedBoardId="selectedBoardId"
        @select="selectBoard"
        @edit="openEditBoard"
        @delete="deleteBoard"
      />

      <div class="board-add">
        <input v-model="newBoardName" placeholder="New Board Name" @keyup.enter="createBoard" />
        <button @click="createBoard">Add Board</button>
      </div>
    </div>

    <div v-if="selectedBoard" class="selected-board">
      <h2>{{ selectedBoard.name }}</h2>

      <InviteSection
        :members="selectedBoard.members"
        @invite="inviteMember"
      />

      <draggable
        v-model="selectedBoard.columns"
        group="columns"
        item-key="id"
        class="columns-container"
        @end="onColumnDragEnd"
      >
        <template #item="{ element: column }">
          <ColumnCard
            :column="column"
            @edit="openEditColumn"
            @delete="deleteColumn"
            @edit-task="openEditTask"
            @remove-tag="handleRemoveTag"
            @add-task="handleAddTask"
            @task-drag-end="onTaskDragEnd"
          />
        </template>
      </draggable>

      <div class="add-column">
        <input v-model="newColumnName" placeholder="New Column Name" @keyup.enter="createColumn" />
        <button @click="createColumn">Add Column</button>
      </div>
    </div>

   
  <EditPopup
  v-if="editPopup.show"
  :show="editPopup.show"
  :type="editPopup.type"
  :data="editPopup.data"
  @save="saveEditPopup"
  @close="closeEditPopup"
  @delete-task="handleDeleteFromPopup"
  @add-tag="addTagToPopup"
  @remove-tag="removeTagFromPopup"
/>




  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import { loadBoards, saveBoards } from '@/mockup/boardStorage'
import BoardCard from '@/components/BoardCard.vue'
import InviteSection from '@/components/InviteSection.vue'
import ColumnCard from '@/components/ColumnCard.vue'
import EditPopup from '@/components/EditPopup.vue'

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

const boards = ref<Board[]>(loadBoards())

if (boards.value.length === 0) {
  boards.value = [
    {
      id: 1,
      name: 'First Board',
      members: ['admin@example.com'],
      columns: [
        { id: 1, name: 'To Do', tasks: [{ id: 1, title: 'Example Task 1', tags: ['urgent'] }] },
        { id: 2, name: 'In Progress', tasks: [] },
      ],
    },
  ]
}

watch(
  boards,
  (newVal) => {
    saveBoards(newVal)
  },
  { deep: true }
)


const newBoardName = ref('')
const selectedBoardId = ref<number | null>(null)
const newColumnName = ref('')

const selectedBoard = computed(() => boards.value.find(b => b.id === selectedBoardId.value) || null)


function createBoard() {
  const name = newBoardName.value.trim()
  if (!name) return
  const newId = Math.max(0, ...boards.value.map(b => b.id)) + 1
  boards.value.push({ id: newId, name, members: [], columns: [] })
  newBoardName.value = ''
}


function selectBoard(id: number) {
  selectedBoardId.value = id
}

function deleteBoard(id: number) {
  boards.value = boards.value.filter(b => b.id !== id)
  if (selectedBoardId.value === id) selectedBoardId.value = null
}


function createColumn() {
  if (!selectedBoard.value) return
  const name = newColumnName.value.trim()
  if (!name) return
  const columns = selectedBoard.value.columns
  const newId = Math.max(0, ...columns.map(c => c.id)) + 1
  columns.push({ id: newId, name, tasks: [] })
  newColumnName.value = ''
}


function deleteColumn(id: number) {
  if (!selectedBoard.value) return
  selectedBoard.value.columns = selectedBoard.value.columns.filter(c => c.id !== id)
}

function inviteMember(email: string) {
  if (!selectedBoard.value) return
  if (!selectedBoard.value.members.includes(email)) {
    selectedBoard.value.members.push(email)
  }
}


function onColumnDragEnd() {}
function onTaskDragEnd() {}


function handleAddTask({ columnId, title }: { columnId: number; title: string }) {
  if (!selectedBoard.value) return
  const column = selectedBoard.value.columns.find(c => c.id === columnId)
  if (!column) return
  const newId = Math.max(0, ...column.tasks.map(t => t.id)) + 1
  column.tasks.push({ id: newId, title, tags: [] })
}


function handleRemoveTag({ taskId, tag }: { taskId: number; tag: string }) {
  if (!selectedBoard.value) return
  for (const col of selectedBoard.value.columns) {
    const task = col.tasks.find(t => t.id === taskId)
    if (task) {
      task.tags = task.tags.filter(t => t !== tag)
      break
    }
  }
}

function handleDeleteFromPopup() {
  const taskId = editPopup.data.id || editPopup.data.taskId
  const columnId = editPopup.data.columnId
  if (taskId == null || columnId == null) {
    console.warn('Missing taskId or columnId in editPopup.data', editPopup.data)
    return
  }
  deleteTaskFromPopup(taskId, columnId)
}




const editPopup = reactive({
  show: false,
  type: '' as 'board' | 'column' | 'task',
  data: {} as any,
})


function openEditBoard(board: Board) {
  selectedBoardId.value = board.id  
  editPopup.type = 'board'
  editPopup.data = { ...board }
  editPopup.show = true
}



function openEditColumn(column: Column) {
  editPopup.type = 'column'
  editPopup.data = { ...column }
  editPopup.show = true
}


function openEditTask(task: Task) {
  if (!selectedBoard.value) return

  const data: any = { ...task, taskId: task.id }  

  for (const col of selectedBoard.value.columns) {
    if (col.tasks.find(t => t.id === task.id)) {
      data.columnId = col.id
      break
    }
  }

  editPopup.type = 'task'
  editPopup.data = data
  editPopup.show = true
}



function closeEditPopup() {
  editPopup.show = false
  editPopup.data = {}
  editPopup.data = {}
}


function saveEditPopup(updatedData: any) {
  if (!selectedBoard.value) return

  if (editPopup.type === 'board') {
    const board = boards.value.find(b => b.id === updatedData.id)
    if (board) {
      board.name = updatedData.name.trim()
    }
  } else if (editPopup.type === 'column') {
    const column = selectedBoard.value.columns.find(c => c.id === updatedData.id)
    if (column) {
      column.name = updatedData.name.trim()
    }
  } else if (editPopup.type === 'task') {
    const column = selectedBoard.value.columns.find(c => c.id === updatedData.columnId)
    if (!column) return
    const task = column.tasks.find(t => t.id === updatedData.id)
    if (task) {
      task.title = updatedData.title.trim()
      task.tags = [...updatedData.tags]
    }
  }

  closeEditPopup()
}


function deleteTaskFromPopup(taskId: number, columnId: number) {
  console.log('Deleting task', taskId, 'from column', columnId)
  if (!selectedBoard.value) return
  const column = selectedBoard.value.columns.find(c => c.id === columnId)
  if (!column) return
  column.tasks = column.tasks.filter(t => t.id !== taskId)
  closeEditPopup()
}


function addTagToPopup(tag: string) {
  if (!editPopup.show || editPopup.type !== 'task') return
  if (!tag) return
  if (!editPopup.data.tags.includes(tag)) {
    editPopup.data.tags.push(tag)
  }
}

function removeTagFromPopup(tag: string) {
  if (!editPopup.show || editPopup.type !== 'task') return
  editPopup.data.tags = editPopup.data.tags.filter((t: string) => t !== tag)
}
</script>

<style scoped>
.board-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.board-container h1 {
  color: #333;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
}

.boards-list {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.board-add {
  background: white;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.board-add input{
    background: white;
  padding: 0.5rem;
  margin: 0.25rem 0;
  max-width: 15rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.board-add button {
  padding: 0.4rem 0.8rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.board-add button:hover {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.board-add button:active {
  transform: translateY(0);
}

.selected-board {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.selected-board h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.columns-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.add-column {
  margin-top: 1rem;
  max-width: 300px;
}

.add-column input,
.add-column button {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.add-column button {
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>
