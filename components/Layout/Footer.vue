<template>
  <footer class="bg-black text-white mx-auto p-4">
    <div class="max-w-7xl mx-auto py-3">
      <div
        v-for="item in allPages"
        class="text-lg underline-offset-2"
        :key="item.node.slug">
        <NuxtLink
          v-if="item.node.isFrontPage === false"
          :to="item.node.slug"
          class="font-normal leading-8 text-xl font-OpenSans hover:text-blue-400"
          >{{ item.node.title }}</NuxtLink
        >
        <hr class="max-w-sm" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { inject } from "vue";
const allPages = inject("allPages");
</script>
