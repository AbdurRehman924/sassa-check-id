<template>
  <div class="flex gap-8">
    <div
      v-for="item in data"
      @click="(selectedCategoryId = item.id), $emit('changeId', item.id)"
      class="h-10 w-auto p-6 flex items-center rounded-full cursor-pointer hover:bg-[#f9bf2d87]"
      :class="item.id === selectedCategoryId ? 'bg-[#f9bf2d87]' : ''">
      {{ item.name }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: Object,
});
let selectedCategoryId = ref(props.data[0].id);
</script>
