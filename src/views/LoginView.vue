<template>
  <div class="login">
    <h2>Login</h2>
    <a-form @submit.prevent="handleLogin">
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

    <a-button type="primary" html-type="submit" style="margin-top: 1rem; width: 100%;">
      Login
    </a-button>
  </a-form>
    <p v-if="errorMsg" style="color: red; margin-top: 0.5rem;">{{ errorMsg }}</p>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script lang="ts" setup>
import { ref, h} from 'vue' 
import { useRouter } from 'vue-router'
import { authenticate , loginUser } from '@/mockup/authStorage'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const passwordVisible = ref(false)

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleLogin = () => {
  if (email.value && password.value) {
    const success = authenticate(email.value, password.value)
    if (success) {
      loginUser(email.value)  
      errorMsg.value = ''
      router.push('/board')
    } else {
      errorMsg.value = 'Invalid email or password'
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 10rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


@media (max-width: 480px) {
  .login {
    margin: 4rem 1rem;
    padding: 1.5rem;
  }
}

.login h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 600;
}


.login form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.login .ant-input,
.login .ant-input-password {
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  width: 21rem;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
  box-shadow: none !important;
}

.login .ant-input-password{
  margin-top: -1rem;
}


@media (max-width: 480px) {
  .login .ant-input,
  .login .ant-input-password {
    width: 100%;
  }
}


.login .ant-input:focus,
.login .ant-input-password:focus,
.login .ant-input-focused,
.login .ant-input-password-focused {
  border-color: #007bff !important;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25) !important;
  outline: none;
}


.login .ant-btn-primary {
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
  .login .ant-btn-primary {
    width: 100%;
  }
}

.login .ant-btn-primary:hover,
.login .ant-btn-primary:focus {
  background: #0056b3;
  border-color: #0056b3;
}


.login p {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}


.login a {
  color: #007bff;
  text-decoration: none;
}

.login a:hover {
  text-decoration: underline;
}
</style>

