<template>
  <NuxtLayout>
    <NuxtPage :pages="data" />
  </NuxtLayout>
</template>

<script setup>
const { fetchPages } = useGetData();
const data = await fetchPages();
provide("allPages", data);
</script>
