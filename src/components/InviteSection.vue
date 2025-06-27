<template>
  <div class="invite-section">
    <h4>Members:</h4>
    <ul class="member-list">
      <li v-for="(member, index) in members" :key="index">{{ member }}</li>
    </ul>
    <div class="invite-input">
      <input
        v-model="email"
        placeholder="Invite member (email)"
        @keyup.enter="invite"
      />
      <button @click="invite">Invite</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ members: string[] }>()

const emit = defineEmits<{
  (e: 'invite', email: string): void
}>()

const email = ref('')

function invite() {
  const trimmed = email.value.trim()
  if (trimmed) {
    emit('invite', trimmed)
    email.value = ''
  }
}
</script>

<style scoped>
.invite-section {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 2rem;
  width: 30rem;
}

.invite-section h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.member-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.member-list li {
  background: white;
  padding: 0.5rem;
  margin: 0.25rem 0;
  max-width: 15rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.invite-input input{
   background: white;
  padding: 0.5rem;
  margin: 0.25rem 0;
  max-width: 15rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.invite-input button {
  padding: 0.4rem 0.8rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  margin: 0.5rem;
}

.invite-input button:hover {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.invite-input button:active {
  transform: translateY(0);
}
</style>
