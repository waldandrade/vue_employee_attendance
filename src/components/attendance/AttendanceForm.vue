<script setup lang="ts">
  import { useSchedule } from '@/schedule/composibles/schedule';
import { Form } from '@primevue/forms';
  import { ref } from 'vue';
  const { push, date } = useSchedule()
  const initialValues = ref({
    date: date,
  });
  
  const submit = async ({ values: data }: any) => {
    await push({ date: data.date, status: 'entering' })
  }

</script>
<template>
  <Form v-slot="$form" :initialValues @submit="submit" class="flex flex-col gap-4 w-full p-12">
      <div class="flex flex-col gap-1">
          {{  date?.toDateString()  }}
      </div>
      <div class="flex flex-col gap-1">
          <DatePicker id="datepicker-timeonly" name="date" timeOnly fluid />
          <Message v-if="$form.time?.invalid" severity="error" size="small" variant="simple">
              <ul class="my-0 px-4 flex flex-col gap-1">
                  <li v-for="(error, index) of $form.time.errors" :key="index">{{ error.message }}</li>
              </ul>
          </Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>