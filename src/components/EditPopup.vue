<template>
  <div v-if="show" class="popup-overlay" @click.self="close">
    <div class="popup"  @click.stop>
      <h3>{{ popupTitle }}</h3>
      
      <template v-if="type === 'board'">
        <input v-model="name" placeholder="Board Name" />
      </template>
      
      <template v-else-if="type === 'column'">
        <input v-model="name" placeholder="Column Name" />
      </template>
      
      <template v-else-if="type === 'task'">
        <input v-model="title" placeholder="Task Title" />
        <div class="tags-section">
          <h4>Tags</h4>
          <div v-for="(tag, idx) in tags" :key="idx" class="tag">
            {{ tag }} <button @click="removeTag(idx)">×</button>
          </div>
          <input v-model="newTag" placeholder="Add tag" @keyup.enter="addTag" />
          <button @click="addTag">Add Tag</button>
        </div>
      </template>
      
      <div class="popup-actions">
        <button @click="save">Save</button>
        <button @click="close">Cancel</button>
        <button v-if="type === 'task'" @click="deleteTask" class="delete-btn">Delete Task</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  type: 'board' | 'column' | 'task' | null
  data: any  
}>()

const emit = defineEmits<{
  (e: 'save', payload: any): void
  (e: 'close'): void
  (e: 'deleteTask'): void
}>()

const name = ref('')
const title = ref('')
const tags = ref<string[]>([])
const newTag = ref('')

watch(() => props.data, (val) => {
  if (!val) return
  if (props.type === 'board' || props.type === 'column') {
    name.value = val.name || ''
  } else if (props.type === 'task') {
    title.value = val.title || ''
    tags.value = val.tags ? [...val.tags] : []
  }
}, { immediate: true })

const popupTitle = computed(() => {
  if (props.type === 'board') return 'Edit Board Name'
  if (props.type === 'column') return 'Edit Column Name'
  if (props.type === 'task') return 'Edit Task'
  return ''
})

function addTag() {
  const t = newTag.value.trim()
  if (t && !tags.value.includes(t)) {
    tags.value.push(t)
    newTag.value = ''
  }
}

function removeTag(idx: number) {
  tags.value.splice(idx, 1)
}

function save() {
  if (props.type === 'board' || props.type === 'column') {
    emit('save', { ...props.data, name: name.value.trim() })
  } else if (props.type === 'task') {
    emit('save', { ...props.data, title: title.value.trim(), tags: [...tags.value] })
  }
}

function close() {
  emit('close')
}

function deleteTask() {
  emit('deleteTask')
}
</script>

<style scoped>

.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.popup input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.popup-actions button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.popup-actions button:hover {
 background: #474747;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #ffffff;
}

.delete-btn {
  margin-left: auto;
  background-color: #dc2626;
  color: white;
}

.tags-section {
  margin-bottom: 1rem;
}

.tags-section h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.tags-section .tag {
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

.tags-section .tag button {
  background: none;
  border: none;
  color: white;
  margin-left: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
