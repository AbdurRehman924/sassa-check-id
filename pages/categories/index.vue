<template>
  <div class="mx-auto max-w-7xl my-3 font-OpenSans">
    <div class="flex gap-8">
      <div
        v-for="item in data"
        @click="(selectedCategoryId = item.id), loadPosts(item.id)"
        class="h-10 w-auto p-6 flex items-center rounded-full cursor-pointer hover:bg-[#f9bf2d87]"
        :class="item.id === selectedCategoryId ? 'bg-[#f9bf2d87]' : ''">
        {{ item.name }}
      </div>
    </div>
    <div
      v-for="item in posts"
      class="max-w-7xl my-3 font-OpenSans text-lg mx-auto"
      v-html="item.node.content"></div>
  </div>
</template>
<script setup>
const { fetchCategories } = useGetData();
const { fetchCategoryById } = useGetData();

let data = await fetchCategories();

let firstCategory = computed(() => {
  return Array.isArray(data.value) && data.value.length > 0
    ? data.value[0].id
    : null;
});
let selectedCategoryId = ref(firstCategory.value);

let posts = ref();
let count = ref();

const loadPosts = async (id) => {
  let loadedPosts = await fetchCategoryById(id);
  posts.value = loadedPosts.value.posts;
  count.value = loadedPosts.value.count;
};

loadPosts(selectedCategoryId.value);
</script>
