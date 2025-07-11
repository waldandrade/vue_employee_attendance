<script setup lang="ts">
  import AppSidebar from './AppSidebar.vue';
  import AppToolbar from './AppToolbar.vue';
</script>

<template>
  <div class="layout-wrapper" >
     <AppToolbar></AppToolbar>
     <AppSidebar></AppSidebar>
     <div class="layout-main-container">
        <div class="layout-main">
            <router-view></router-view>
        </div>
        <!-- <app-footer></app-footer> -->
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
</template>