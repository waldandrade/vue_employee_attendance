
<template>
    <div class="card flex justify-center">
        <Button label="Entrar" size="small" variant="outlined" @click="loginFormVisible = true"/>
        <Dialog v-model:visible="loginFormVisible" modal header="Entrar" :style="{ width: '25rem' }">
            <Form v-slot="$form" :initialValues @submit="login" class="flex flex-col gap-4 w-full">
              <span class="text-surface-500 dark:text-surface-400 block">Entre com e-mail e senha</span>
              <div class="flex flex-col gap-1">
                  <InputText name="username" type="text" placeholder="Username" fluid autocomplete="off"/>
                  <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
              </div>
              <div class="flex flex-col gap-1">
                  <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid autocomplete="off"/>
                  <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                      <ul class="my-0 px-4 flex flex-col gap-1">
                          <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
                      </ul>
                  </Message>
              </div>
              <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="loginFormVisible = false"></Button>
                <Button type="submit" label="Submit" />
              </div>
            </Form>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
  import { useAuth } from "@/auth/authStatus";
  import { ref } from "vue";
  const { authByCredentials, loginFormVisible } = useAuth()
  
  const initialValues = ref({
    username: '',
    password: '',
  });
  
  const login = async ({ values: data }: any) => {
    authByCredentials(data.username, data.password)
  }

</script>
