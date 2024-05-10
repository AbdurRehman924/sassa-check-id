<template>
  <div
    v-for="item in data"
    class="max-w-7xl my-3 font-OpenSans text-lg mx-auto"
    v-html="item.node.content"></div>
</template>
<script setup>
const props = defineProps({
  data: Object,
});
</script>
