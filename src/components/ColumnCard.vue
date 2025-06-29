<template>
  <div class="column-card">
    <div class="column-header">
      <h3>{{ column.name }}</h3>
      <div>
        <button @click.stop="$emit('edit', column)" class="column-edit-btn">Edit</button>
        <button @click.stop="$emit('delete', column.id )" class="column-delete-btn">Delete</button>
      </div>
    </div>

    <draggable
      v-model="column.tasks"
      :group="{ name: 'tasks', pull: true, put: true }"
      item-key="id"
      class="tasks-list"
      @end="$emit('task-drag-end')"
    >
      <template #item="{ element: task }">
        <TaskCard
          :task="task"
          @edit="$emit('edit-task', task)"
          @remove-tag="tag => $emit('remove-tag', { taskId: task.id, tag })"
        />
      </template>
    </draggable>

    <div class="add-task">
      <input
        v-model="newTaskTitle"
        :placeholder="`Add task in ${column.name}`"
        @keyup.enter="addTask"
      />
      <button @click="addTask">Add</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

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

const props = defineProps<{ column: Column }>()

const emit = defineEmits<{
  (e: 'edit', column: Column): void
  (e: 'delete', id: number): void
  (e: 'edit-task', task: Task): void
  (e: 'remove-tag', payload: { taskId: number; tag: string }): void
  (e: 'add-task', payload: { columnId: number; title: string }): void
  (e: 'task-drag-end'): void
}>()

const newTaskTitle = ref('')

watch(() => props.column, () => {
  newTaskTitle.value = ''
})

function addTask() {
  const title = newTaskTitle.value.trim()
  if (!title) return
  emit('add-task', { columnId: props.column.id, title })
  newTaskTitle.value = ''
}
</script>

<style scoped>
.column-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  min-width: 280px;
  max-width: 300px;
  flex-shrink: 0;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;
}

.column-header h3 {
  color: #333;
  margin: 0;
  font-weight: 600;
}

.column-header div {
  display: flex;
  gap: 0.5rem;
}

.column-header input{
   background: white;
  padding: 0.5rem;
  margin: 0.25rem 0;
  max-width: 15rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.column-header button {
  padding: 0.4rem 0.8rem;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  margin: 0rem;
}

.column-header button:hover {
  background: #636363;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(129, 129, 129, 0.3);
}

.column-header button:active {
  transform: translateY(0);
}

.tasks-list {
  min-height: 200px;
  margin-bottom: 1rem;
}

.add-task input {
  width: 93%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.add-task button {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.column-edit-btn{
  background-color: #007bff;
}

.column-delete-btn{
  background-color: rgb(206, 10, 10) ;
}
</style>
