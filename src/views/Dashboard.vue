<script setup lang="ts">
import { useAuth } from '@/auth/authStatus';
import AttendanceForm from '@/components/attendance/AttendanceForm.vue';
import AttendanceList from '@/components/attendance/AttendanceList.vue';
import RegisterDialog from '@/components/user/RegisterDialog.vue';
import { Button } from 'primevue';

const { isLoggedIn, loginFormVisible, registerFormVisible } = useAuth()

</script>

<template>
    <div v-if="isLoggedIn" class="grid grid-cols-2 gap-8">
        <AttendanceForm></AttendanceForm>
        <AttendanceList></AttendanceList>
    </div>
    <div v-else class="flex justify-center items-center absolute inset-0 top-16 bg-[url(assets/register.png)] bg-cover">
        <div class="grid lg:grid-cols-2 w-full h-full">
            <div class="flex justify-center items-center p-28 bg-primary-50">
                <div class="flex flex-col gap-6 justify-start w-full">
                    <div class="gap-1 flex flex-col">
                        <div class="text-5xl font-bold">Employee attendance</div>
                        <div class="text-2xl font-normal">Uma plataforma de controle de ponto</div>
                    </div>
                    <div class="w-fit flex flex-row gap-2">
                        <Button class="w-fit" size="large" @click="registerFormVisible = true">Registre-se agora</Button>
                        <Button class="w-fit" size="large" variant="link" @click="loginFormVisible = true">Já tenho cadastro</Button>
                    </div>
                </div>
            </div>
            <div class="hidden lg:flex justify-center w-full">
            </div>
        </div>
        <RegisterDialog></RegisterDialog>
    </div>
</template>