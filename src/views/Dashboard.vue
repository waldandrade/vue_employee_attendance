<script setup lang="ts">
import AttendanceForm from '@/components/attendance/AttendanceForm.vue';
import AttendanceList from '@/components/attendance/AttendanceList.vue';
</script>

<template>
    <div class="grid grid-cols-2 gap-8">
        <AttendanceForm></AttendanceForm>
        <AttendanceList></AttendanceList>
    </div>
</template>