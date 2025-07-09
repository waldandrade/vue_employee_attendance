<script setup lang="ts">
  import { Form } from '@primevue/forms';
  import { ref } from 'vue';
  import axios from 'axios';
  const initialValues = ref({
    username: '',
    password: '',
  });
  
  const login = async ({ values: data }: any) => {
    const params = new URLSearchParams()
    params.append("username", data.username)
    params.append("password", data.password)

    const url = new URL('login', import.meta.env.VITE_API_URL);
    const response = await axios.post(url.toString(), params)
    localStorage.setItem('token', response.data.access_token)
  }

</script>
<template>
  <Form v-slot="$form" :initialValues @submit="login" class="flex flex-col gap-4 w-full p-12">
      <div class="flex flex-col gap-1">
          <InputText name="username" type="text" placeholder="Username" fluid />
          <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
          <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid />
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
              <ul class="my-0 px-4 flex flex-col gap-1">
                  <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
              </ul>
          </Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>