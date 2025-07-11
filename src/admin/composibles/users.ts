import { ref } from 'vue';
import axios from 'axios';
import { useAuth } from '@/auth/authStatus';
import type { TUser } from '@/auth/types';

const users = ref<TUser[] | null>(null);
const { token } = useAuth()

const url = new URL('user', import.meta.env.VITE_API_URL);
export function useUsers() {  
  const get = async () => {
    const response = await axios.get(url.toString(), { headers: { 'Authorization': `Bearer ${token}` } })
    setUsers(response.data)
  }

  const push = async (user: TUser) => {
    await axios.post(url.toString(), user, { headers: { 'Authorization': `Bearer ${token}` } })
    get()
  }

  const setUsers = (list: TUser[]) => {
    users.value = list;
  }

  return {
    get,
    push,
    users,
  }
}
