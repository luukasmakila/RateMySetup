export const useAuth = () => {
  const token = localStorage.getItem('authToken')
  if(!token) return false
  return true
}