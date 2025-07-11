<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import { useLayout } from '@/layout/composables/layout';
import { useAuth } from '@/auth/authStatus';
import UserPopover from '@/components/user/UserMenu.vue';
import LoginButton from '@/components/user/LoginButton.vue';

const { menuVisible } = useLayout();
const { isLoggedIn } = useAuth();

</script>

<template>
    <Toolbar>
      <template #start>
        <div class="flex items-center gap-2">
            <Button icon="pi pi-bars" variant="text" rounded @click="menuVisible = true" />
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
            <LoginButton v-if="!isLoggedIn" />
            <UserPopover v-else />
        </div>
      </template>
    </Toolbar>
</template>