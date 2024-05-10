<template>
  <div class="mx-auto max-w-7xl my-3 font-OpenSans">
    <CategoriesList :data="categories" @changeId="loadPosts" />
    <CategoriesPosts :data="posts" />
  </div>
</template>
<script setup>
const { fetchCategories } = useGetData();
const { fetchCategoryById } = useGetData();

let categories = await fetchCategories();

let posts = ref();
let count = ref();

const loadPosts = async (id) => {
  let loadedPosts = await fetchCategoryById(id);
  posts.value = loadedPosts.value.posts;
  count.value = loadedPosts.value.count;
};

let firstCategoryId = computed(() => categories.value[0].id);
loadPosts(firstCategoryId.value);
</script>
