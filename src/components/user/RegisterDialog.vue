
<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="registerFormVisible" modal header="Registrar" :style="{ width: '25rem' }">
            <Form v-slot="$form" :initialValues @submit="register" :resolver="resolver" class="flex flex-col gap-4 w-full">
              <span class="text-surface-500 dark:text-surface-400 block">Informe seus dados</span>
              <div class="flex flex-col gap-1">
                  <InputText name="name" placeholder="Nome do funcionário" :feedback="false" toggleMask fluid autocomplete="off"/>
                  <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
                      <ul class="my-0 px-4 flex flex-col gap-1">
                          <li v-for="(error, index) of $form.name.errors" :key="index">{{ error.message }}</li>
                      </ul>
                  </Message>
              </div>
              <div class="flex flex-col gap-1">
                  <InputText name="email" type="text" placeholder="Email" />
                  <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
              </div>
              <div class="flex flex-col gap-1">
                  <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid autocomplete="password"/>
                  <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                      <ul class="my-0 px-4 flex flex-col gap-1">
                          <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
                      </ul>
                  </Message>
              </div>
              <div class="flex flex-col gap-1">
                  <Password id="confirm"  name="confirm" placeholder="Confirme o password" :feedback="false" toggleMask fluid autocomplete="off"/>
                  <Message v-if="$form.confirm?.invalid" severity="error" size="small" variant="simple">
                      <ul class="my-0 px-4 flex flex-col gap-1">
                          <li v-for="(error, index) of $form.confirm.errors" :key="index">{{ error.message }}</li>
                      </ul>
                  </Message>
              </div>
              <div class="flex flex-col gap-1">
                <SelectButton name="schedule_method" :options="options"  optionLabel="name" optionValue="value"/>
              </div>
              <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="registerFormVisible = false"></Button>
                <Button type="submit" label="Submit" />
              </div>
            </Form>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
  import { useAuth } from "@/auth/authStatus";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { SelectButton } from "primevue";
  import { ref } from "vue";
import z from "zod";
  const { signUp, registerFormVisible } = useAuth()
  
  const initialValues = ref({
    name: '',
    email: '',
    password: '',
    confirm: '',
    schedule_method: ''
  });

  const options = ref([{ name: '6 Horas Corridas', value: 'six_hours_without_break' },
    { name: '8 Horas com pausa', value: 'eight_hours_with_break' }]);
  

  const validation = z.object({
      name: z.string(),
      password: z.string().min(4, { message: 'Password is required.' }),
      confirm: z.string({ coerce: true }).optional(),
      email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
    }).passthrough().superRefine((data, ctx) => {
      if (data.password !== data.confirm) {
        ctx.addIssue({
          code: 'custom',
          message: "Passwords don't match",
          path: ['confirm'],
        })
        return ctx
      }
    });

  const resolver = ref(zodResolver(validation));
  
  const register = async ({ values: data }: any) => {
    signUp(data)
  }

</script>
