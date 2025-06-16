<script lang="ts" setup>
import AppHeader from '../common/app-header.vue'
import AppAside from '../common/app-aside.vue'
import { ref } from 'vue'

const expandMenu = ref(true)
</script>

<template>
  <div class="flex">
    <AppAside v-model:expand="expandMenu" />

    <div class="flex min-h-[100vh] shrink grow flex-col overflow-hidden">
      <AppHeader v-model:expand-menu="expandMenu" />

      <main class="w-full shrink grow bg-stone-100 p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
