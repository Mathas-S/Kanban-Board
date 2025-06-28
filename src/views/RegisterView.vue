<template>
  <div class="register">
    <h2>Register</h2>
    <a-form @submit.prevent="handleRegister">
    <a-input v-model:value="email" type="email" placeholder="Email" required />

    <a-space direction="horizontal" style="margin-top: 1rem;">
      <a-input-password
        v-model:value="password"
        placeholder="Password"
        :visibilityToggle="{ visible: passwordVisible, onVisibleChange: togglePasswordVisible }"
        :iconRender="(visible: boolean) => visible ? h(EyeTwoTone) : h(EyeInvisibleOutlined)"
        style="flex: 1;"
      />
    </a-space>

    <a-space direction="horizontal" style="margin-top: 1rem;">
      <a-input-password
        v-model:value="confirmPassword"
        placeholder="Confirm Password"
        :visibilityToggle="{ visible: confirmPasswordVisible, onVisibleChange: toggleConfirmPasswordVisible }"
        :iconRender="(visible: boolean) => visible ? h(EyeTwoTone) : h(EyeInvisibleOutlined)"
        style="flex: 1;"
      />
    </a-space>

    <a-button type="primary" html-type="submit" style="margin-top: 1rem; width: 100%;">
      Register
    </a-button>
  </a-form>
    <p v-if="errorMsg" style="color: red; margin-top: 0.5rem;">{{ errorMsg }}</p>
<p v-if="successMsg" style="color: green; margin-top: 0.5rem;">{{ successMsg }}</p>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script lang="ts" setup>
import { ref , h } from 'vue'
import { useRouter } from 'vue-router'
import { addUser } from '@/mockup/authStorage'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
const toggleConfirmPasswordVisible = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value
}

const handleRegister = () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match'
    return
  }

  const success = addUser(email.value.trim(), password.value)
  if (!success) {
    errorMsg.value = 'This email is already registered.'
    return
  }

  successMsg.value = 'Registered successfully!'
  setTimeout(() => {
    router.push('/login')
  }, 1000)
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 10rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


@media (max-width: 480px) {
  .register {
    margin: 4rem 1rem;
    padding: 1.5rem;
  }
}

.register h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 600;
}


.register form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.register .ant-input,
.register .ant-input-password {
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  width: 21rem;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
  box-shadow: none !important;
}

.register .ant-input-password {
  margin-top: -1rem;
}


@media (max-width: 480px) {
  .register .ant-input,
  .register .ant-input-password {
    width: 100%;
  }
}


.register .ant-input:focus,
.register .ant-input-password:focus,
.register .ant-input-focused,
.register .ant-input-password-focused {
  border-color: #007bff !important;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25) !important;
  outline: none;
}


.register .ant-btn-primary {
  padding: 0.75rem;
  font-size: 1rem;
  height: 3rem;
  border-radius: 4px;
  background: #007bff;
  border-color: #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 21rem;
}


@media (max-width: 480px) {
  .register .ant-btn-primary {
    width: 100%;
  }
}

.register .ant-btn-primary:hover,
.register .ant-btn-primary:focus {
  background: #0056b3;
  border-color: #0056b3;
}


.register p {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}


.register a {
  color: #007bff;
  text-decoration: none;
}

.register a:hover {
  text-decoration: underline;
}
</style>
