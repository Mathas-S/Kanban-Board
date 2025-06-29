<template>
  <div
    class="board-card"
    :class="{ selected: selectedBoardId === board.id }"
    @click="$emit('select', board.id)"
  >
    <div class="board-name">{{ board.name }}</div>
    <div class="board-actions">
      <button @click.stop="$emit('edit', board)" class="board-edit-btn">Edit</button>
      <button @click.stop="$emit('delete', board.id)" class="board-delete-btn">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

interface Board {
  id: number
  name: string
  members: string[]
  columns: any[]
}

const props = defineProps<{
  board: Board
  selectedBoardId: number | null
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void
  (e: 'edit', board: Board): void
  (e: 'delete', id: number): void
}>()
</script>

<style scoped>
.board-card {
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.board-card:hover {
  border-color: #007bff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
  transform: translateY(-2px);
}

.board-card.selected {
  border-color: #007bff;
  background: #f0f8ff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

.board-name {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
  font-size: 1.1rem;
}

.board-actions {
  display: flex;
  gap: 0.5rem;
}

.board-edit-btn{
  background: #007bff;
}

.board-delete-btn {
  background: rgb(206, 10, 10);
}

.board-actions button {
  padding: 0.4rem 0.8rem;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.board-actions button:hover {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.board-actions button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .board-card {
    min-width: auto;
    width: 100%;
  }
}
</style>
