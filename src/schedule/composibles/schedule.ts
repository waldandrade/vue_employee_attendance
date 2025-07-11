import { ref, watch } from 'vue';
import axios from 'axios';
import { useAuth } from '@/auth/authStatus';

interface TAttendance {
  date: Date
  status: string
}

const date = ref<Date | undefined>();
const attendances = ref<TAttendance[] | null>(null);
const { token } = useAuth()

const url = new URL('attendance', import.meta.env.VITE_API_URL);
export function useSchedule() {
  const storageVal = window.localStorage.getItem('date');
  if (storageVal) {
    date.value = new Date(storageVal);
  } else {
    date.value = new Date();
  }
  
  const get = async () => {
    const response = await axios.get(url.toString(), { headers: { 'Authorization': `Bearer ${token}` } })
    setAttendances(response.data)
  }

  const push = async (attendance: TAttendance) => {
    await axios.post(url.toString(), attendance, { headers: { 'Authorization': `Bearer ${token}` } })
    get()
  }

  const setAttendances = (list: TAttendance[]) => {
    attendances.value = list;
  }

  watch(
    date,
    val => {
      if (val !== undefined) {
        if (val === null) {
          localStorage.removeItem('date')
        } else {
          localStorage.setItem('date', val.toJSON())
        }
      }
    },
    { deep: true }
  )
  
  return {
    get,
    push,
    date,
    attendances: attendances,
  }
}
