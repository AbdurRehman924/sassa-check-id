<template>
  <div class="mx-auto max-w-7xl my-3 font-OpenSans">
    <div class="flex gap-8">
      <div
        v-for="item in data"
        @click="selectedCategoryId = item.id"
        class="h-10 w-auto p-6 flex items-center rounded-full cursor-pointer hover:bg-[#f9bf2d87]"
        :class="item.id === selectedCategoryId ? 'bg-[#f9bf2d87]' : ''">
        {{ item.name }}
      </div>
    </div>
    <div
      v-for="edge in loadedPosts?.posts?.edges"
      class="max-w-7xl my-3 font-OpenSans text-lg mx-auto"
      v-html="edge?.node?.content"></div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const { fetchCategories } = useGetData();
const { fetchCategoryById } = useGetData();
const data = await fetchCategories();

let firstCategory = computed(() => {
  if (Array.isArray(data.value) && data.value.length > 0) {
    return data.value[0].id;
  }
  return null;
});
let selectedCategoryId = ref(firstCategory.value);

let loadedPosts;
const loadPosts = async () => {
  if (selectedCategoryId.value !== null) {
    loadedPosts = await fetchCategoryById(selectedCategoryId.value);
  }
};

watch(selectedCategoryId, () => {
  loadPosts();
});

loadPosts();
</script>
