
interface User {
  email: string
  password: string
}
export function loadUsers(): User[] {
  const data = localStorage.getItem('mock_users')
  return data ? JSON.parse(data) : []
}

export function saveUsers(users: User[]) {
  localStorage.setItem('mock_users', JSON.stringify(users))
}

export function authenticate(email: string, password: string): boolean {
  const users = loadUsers()
  return users.some(u => u.email === email && u.password === password)
}

export function addUser(email: string, password: string): boolean {
  const users = loadUsers()
  if (users.find(u => u.email === email)) {
    return false 
  }
  users.push({ email, password })
  saveUsers(users)
  return true
}

export function loginUser(email: string) {
  localStorage.setItem('mock_logged_in_user', email)
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('mock_logged_in_user')
}

export function logoutUser() {
  localStorage.removeItem('mock_logged_in_user')
}

export function getCurrentUser(): string | null {
  return localStorage.getItem('mock_logged_in_user')
}
