import { computed, reactive, ref, watch } from 'vue';
import axios from 'axios';
import type { TUser } from './types';

interface TAuthState {
  token: string | null | undefined
}
const authState = reactive<TAuthState>({
    token: undefined,
});

const user = ref<TUser | null>(null)
const startUp = ref(true)

const loginFormVisible = ref(false)
const registerFormVisible = ref(false)

export function useAuth() {
  const loadProfile =async () => {
    const url = new URL('user/profile', import.meta.env.VITE_API_URL);
    try {
      const response = await axios.get(url.toString(), { headers: { 'Authorization': `Bearer ${authState.token}` } })
      user.value = response.data
    } catch(e) {
      user.value = null
    }
  }

  const login = (newToken: string) => {
    authState.token = newToken
  }

  const logoff = () => {
    authState.token = null
  }

  const isLoggedIn = computed(() => {
    return !!authState.token
  });

  const signUp = async (userData: any) => {
    const url = new URL('user', import.meta.env.VITE_API_URL);
    await axios.post(url.toString(), userData)
    authByCredentials(userData.email, userData.password)
  }

  const authByCredentials = async (username: string, password: string) => {
    const params = new URLSearchParams()
    params.append("username", username)
    params.append("password", password)

    const url = new URL('login', import.meta.env.VITE_API_URL);
    const response = await axios.post(url.toString(), params)
    login(response.data.access_token)
  }

  watch(
    authState,
    val => {
      if (val.token !== undefined) {
        if (val.token === null) {
          localStorage.removeItem('token')
          user.value = null
        } else {
          localStorage.setItem('token', val.token)
          loadProfile()
        }
      }
    },
    { deep: true }
  )

  const initUser = async () => {
    const storageVal = window.localStorage.getItem('token');
    if (storageVal) {
      authState.token = storageVal;
    }
    await loadProfile()
    startUp.value = false
  }

  if (startUp.value) {
    initUser()
  }
  
  return {
    login,
    logoff,
    isLoggedIn,
    authByCredentials,
    signUp,
    token: authState.token,
    loginFormVisible,
    registerFormVisible,
    user,
    startUp
  }
}
