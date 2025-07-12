<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useUsers } from './composibles/users';
import { Tag } from 'primevue';
import { onMounted } from 'vue';
import type { TUser } from '@/auth/types';
const { users, get } = useUsers()

const getMethodLabel = (user: TUser) => {
    switch (user.schedule_method) {
        case 'six_hours_without_break':
            return '6 horas';

        default:
            return '8 horas';
    }
}

onMounted(() => {
  get()
})

</script>
<template>
  <DataTable :value="users" tableStyle="min-width: 50rem">
    <Column field="email" header="Email"></Column>
    <Column field="schedule_method" header="Tipo de jornada">
      <template #body="slotProps">
        <Tag :value="getMethodLabel(slotProps.data)" severity="contrast" />
      </template>
    </Column>
  </DataTable>
</template>