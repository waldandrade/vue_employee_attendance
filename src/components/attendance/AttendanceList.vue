<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useSchedule } from '@/schedule/composibles/schedule';
import { Tag } from 'primevue';
import { onMounted } from 'vue';
const { attendances, get } = useSchedule()

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
  <DataTable :value="attendances" tableStyle="min-width: 50rem">
    <Column field="date" header="Date">
      <template #body="{ data }">
          {{ formatDate(data.date) }}
      </template>
    </Column>
    <Column field="status" header="Status">
      <template #body="slotProps">
        <Tag :value="getStatusLabel(slotProps.data)" :severity="getStatusSeverity(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>