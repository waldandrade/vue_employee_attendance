<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useUsers } from './composibles/users';
import { Tag } from 'primevue';
import { onMounted } from 'vue';
const { users, get } = useUsers()

const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

const getStatusSeverity = (attendance: any) => {
    switch (attendance.status) {
        case 'ENTERING':
            return 'success';

        default:
            return 'null';
    }
}

const getStatusLabel = (attendance: any) => {
    switch (attendance.status) {
        case 'entering':
            return 'Entrando';

        default:
            return 'Saindo';
    }
}

onMounted(() => {
  get()
})

</script>
<template>
  <DataTable :value="users" tableStyle="min-width: 50rem">
    <Column field="email" header="Email"></Column>
  </DataTable>
</template>