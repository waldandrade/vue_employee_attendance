import { computed, reactive, watch } from 'vue';
import axios from 'axios';

interface TAuthState {
  token: string | null | undefined
}
const authState = reactive<TAuthState>({
    token: undefined,
});

export function useAuth() {
  const storageVal = window.localStorage.getItem('token');
  if (storageVal) {
    authState.token = storageVal;
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
        } else {
          localStorage.setItem('token', val.token)
        }
      }
    },
    { deep: true }
  )
  
  return {
    login,
    logoff,
    isLoggedIn,
    authByCredentials,
    token: authState.token,
  }
}
