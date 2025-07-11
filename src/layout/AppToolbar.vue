<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import { useLayout } from '@/layout/composables/layout';
import { useAuth } from '@/auth/authStatus';
import UserPopover from '@/components/user/UserMenu.vue';
import LoginButton from '@/components/user/LoginButton.vue';

const { menuVisible, isDark, toogleDarkMode } = useLayout();
const { isLoggedIn } = useAuth();

</script>

<template>
    <Toolbar>
      <template #start>
        <div class="flex items-center gap-2">
            <Button icon="pi pi-bars" variant="text" rounded @click="menuVisible = true" />
            <Button :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'" variant="text" rounded @click="toogleDarkMode" aria-label="Theme"/>
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