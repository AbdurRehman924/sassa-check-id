<template>
  <div
    class="bg-slate-50 my-4 p-3 border-[1px] mx-auto max-w-2xl mb-3 px-4 font-OpenSans text-lg">
    <form @submit.prevent="checkStatus" v-if="!result">
      <label class="font-bold font-OpenSans">ID Number</label>
      <input
        type="text"
        id="id-number"
        class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
        placeholder="Id number"
        required
        v-model="id_number" />
      <label class="font-bold font-OpenSans">Phone Number</label>
      <input
        type="text"
        id="phone-number"
        class="mb-3 bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
        placeholder="Phone number"
        required
        v-model="phone_number" />

      <div class="flex justify-center mt-2">
        <button
          type="submit"
          class="text-white bg-[#000000] hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
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
