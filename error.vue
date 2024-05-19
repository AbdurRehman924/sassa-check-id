<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <p class="text-2xl font-bold">{{ error?.message }}</p>
    <NuxtLink
      to="/"
      v-if="error?.statusCode == 404"
      class="px-4 py-3 font-medium text-black rounded-lg font-lg hover:text-black bg-sassa"
      >Go to Home</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
const error = useError();
</script>

<style scoped></style>
