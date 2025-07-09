<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import { useLayout } from '@/layout/composables/layout';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <Toolbar>
      <template #start>
        <div class="flex items-center gap-2">
            <Button icon="pi pi-bars" variant="text" rounded @click="toggleMenu" />
            <Button :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" variant="text" rounded @click="toggleDarkMode" aria-label="Theme"/>
            <Button icon="pi pi-palette" variant="text" rounded aria-label="Pallete"/>
            <Button icon="pi pi-ellipsis-v" variant="text" rounded aria-label="Options"/>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
            <Button label="Login" severity="contrast" size="small" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
        </div>
      </template>
    </Toolbar>
</template>