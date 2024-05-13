<template>
  <footer class="p-4 mx-auto text-white bg-black">
    <div class="py-3 mx-auto max-w-7xl">
      <div
        v-for="item in allPages"
        class="text-lg underline-offset-2"
        :key="item.node.slug"
      >
        <SiteLink
          v-if="item.node.isFrontPage === false"
          :to="`/${item.node.slug}`"
          class="text-xl font-normal leading-8 font-OpenSans hover:text-blue-400"
          >{{ item.node.title }}</SiteLink
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
