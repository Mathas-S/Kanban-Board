<template>
  <div class="invite-section">
    <div class="header">
      <h4>Members:</h4>
      <button class="add-btn" @click="showPopup = true">Add Member</button>
    </div>

    <div class="member-list">
      <span v-for="(member, index) in members" :key="index" class="member-name">{{ member }}</span>
    </div>

    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <h3>Invite Member</h3>
        <input v-model="email" placeholder="Enter email" @keyup.enter="invite" />
        <p v-if="error" class="error">{{ error }}</p>
        <div class="popup-actions">
          <button @click="invite">Invite</button>
          <button class="close-btn" @click="closePopup">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ members: string[] }>()
const emit = defineEmits<{ (e: 'invite', email: string): void }>()

const email = ref('')
const showPopup = ref(false)
const error = ref('')

function isValidEmail(value: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value)
}

function invite() {
  const trimmed = email.value.trim()
  if (!isValidEmail(trimmed)) {
    error.value = 'Please enter an email address'
    return
  }

  emit('invite', trimmed)
  email.value = ''
  showPopup.value = false
  error.value = ''
}

function closePopup() {
  showPopup.value = false
  email.value = ''
  error.value = ''
}

</script>

<style scoped>
.invite-section {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-btn {
  padding: 0.4rem 0.8rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #0056b3;
}

.member-list {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.member-name {
  background: #fff;
  border: 1px solid #ddd;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.popup input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.popup button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.popup .close-btn {
  background: #ccc;
  color: #333;
}

.popup .close-btn:hover {
  background: #999;
}

.popup button:not(.close-btn) {
  background: #007bff;
  color: white;
}

.popup button:not(.close-btn):hover {
  background: #0056b3;
}

.error {
  color: red;
  font-size: 0.85rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}
</style>
