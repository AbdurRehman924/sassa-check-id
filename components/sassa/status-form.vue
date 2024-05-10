<template>
  <div class="mx-auto max-w-2xl my-3 font-OpenSans text-lg">
    <form @submit.prevent="checkStatus" v-if="!result">
      <h1>Sassa Status</h1>
      <input
        type="text"
        id="id-number"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Id number"
        required
        v-model="id_number" />
      <input
        type="text"
        id="phone-number"
        class="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Phone number"
        required
        v-model="phone_number" />

      <div class="flex justify-center mt-2">
        <button
          type="submit"
          class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
          Check Status
        </button>
      </div>
    </form>
    <SassaStatusResult
      v-if="result"
      :data="result"
      @closeStatusResult="result = null" />
  </div>
</template>
<script setup>
let id_number = ref("");
let phone_number = ref("");
let result = ref();

const checkStatus = async () => {
  try {
    const response = await fetch(
      `https://srd.sassa.gov.za/srdweb/api/web/outcome/${id_number.value}/${phone_number.value}`
    );
    result.value = await response.json();
  } catch (error) {
    result.value = error.message;
  }
};
</script>
