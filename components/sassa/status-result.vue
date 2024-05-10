<template>
  <div class="mx-auto max-w-2xl my-3 font-OpenSans text-lg">
    <div class="flex justify-end">
      <IconsCross class="w-8 h-8" @click="$emit('closeStatusResult')" />
    </div>
    <div v-if="data.appId">
      <h1 class="flex justify-center">Application {{ data.appId }}</h1>
      <div v-for="item in data.outcomes" class="my-2">
        <div
          v-if="item.outcome == 'approved'"
          class="bg-green-500 rounded-md p-2">
          <p>
            {{ item.period }}
            {{ item.outcome }}
          </p>
          <p>
            Your application has been approved and your pay day is
            {{ item.payday }} , {{ item.period }}.
          </p>
        </div>

        <div
          v-else-if="item.outcome == 'declined'"
          class="bg-red-400 rounded-md p-2">
          <p>
            {{ item.period }}
            {{ item.outcome }}
          </p>
          <p>
            Your application has been declined , reason:
            {{ item.reason }}.
          </p>
        </div>

        <div
          v-else-if="item.outcome == 'pending'"
          class="bg-gray-400 rounded-md p-2">
          <p>
            {{ item.period }}
            {{ item.outcome }}
          </p>
          <p>Your application is still pending.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="flex justify-center text-red-500">
        {{ data.messages[0] }}
      </h1>
    </div>
    <div class="flex justify-center">
      <a
        href="#"
        class="text-gray-900 hover:text-gray-500 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
        @click="$emit('closeStatusResult'), window.scrollTo(0, 0)">
        Check another status
      </a>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: Object,
});
</script>
