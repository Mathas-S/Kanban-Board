<template>
  <div>
    <div class="task-card">
      <span>{{ task.title }}</span>
      <div>
        <button @click.stop="$emit('edit', task)">Edit</button>
      </div>
    </div>

    <div class="task-tags">
      <span
        v-for="(tag, index) in task.tags"
        :key="index"
        class="tag"
      >
        {{ tag }}
        <button @click="$emit('remove-tag', tag)">×</button>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

interface Task {
  id: number
  title: string
  tags: string[]
}

const props = defineProps<{ task: Task }>()

const emit = defineEmits<{
  (e: 'edit', task: Task): void
  (e: 'remove-tag', tag: string): void
}>()
</script>

<style scoped>
.task-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: grab;
  transition: box-shadow 0.3s ease;
}

.task-card:hover {
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
}

.task-card span {
  flex: 1;
  margin-right: 0.5rem;
  color: #333;
}

.task-card div button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.85rem;
}

.task-tags {
  margin-bottom: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
}

.tag button {
  background: none;
  border: none;
  color: white;
  margin-left: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
