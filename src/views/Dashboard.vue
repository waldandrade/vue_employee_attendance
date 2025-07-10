<script setup lang="ts">
import { useAuth } from '@/auth/authStatus';
import AttendanceForm from '@/components/attendance/AttendanceForm.vue';
import AttendanceList from '@/components/attendance/AttendanceList.vue';

const { isLoggedIn } = useAuth()

</script>

<template>
    <div v-if="isLoggedIn" class="grid grid-cols-2 gap-8">
        <AttendanceForm></AttendanceForm>
        <AttendanceList></AttendanceList>
    </div>
    <div v-else>
        Entre para visualizar
    </div>
</template>