<template>
  <div
    v-if="pageWithId"
    class="mx-auto max-w-7xl my-3 font-OpenSans"
    v-html="data?.page.content"></div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const { fetchPageById } = useGetData();
const route = useRoute();
const params = toRefs(route.params);
const props = defineProps({
  pages: Object,
});

const lastElement = computed(
  () => params.slug.value[params.slug.value.length - 1]
);
const pageWithId = computed(() =>
  props.pages.find((page) => page.node.slug === lastElement.value)
);

const data = await fetchPageById(pageWithId.value.node.id);
</script>
