
<template>
    <div class="card flex justify-center">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" @click="toggle" style="width: 32px; height: 32px" aria-haspopup="true"  aria-controls="overlay_menu"/>
        <Menu :model="items" id="overlay_menu" ref="menu" :popup="true" />
    </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/auth/authStatus";
import { ref } from "vue";
const { logoff } = useAuth();

const menu = ref();
const items = ref([
    {
        label: 'Conta',
        items: [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    logoff()
                }
            }
        ]
    }
]);

const toggle = (event: any) => {
    menu.value.toggle(event);
}

</script>
