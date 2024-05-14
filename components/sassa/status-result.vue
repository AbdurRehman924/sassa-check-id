<template>
  <div class="mx-auto max-w-2xl my-3 font-OpenSans text-lg px-4">
    <div class="flex justify-end">
      <IconsCross
        class="w-8 h-8 cursor-pointer"
        @click="$emit('closeStatusResult')" />
    </div>
    <div v-if="data.appId">
      <h1 class="flex justify-center">Application {{ data.appId }}</h1>
      <div v-for="item in sortedData" class="my-2">
        <div v-if="item.outcome == 'approved'">
          <Disclosure as="div" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">{{
                  item.period
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <ul class="list-none">
                <li>
                  <span class="font-bold mr-2">Outcome: </span>
                  {{ item.outcome }}
                </li>
                <li>
                  <span class="font-bold mr-2">Payday: </span>{{ item.payday }}
                </li>
                <li>
                  <span class="font-bold mr-2">Filed:</span>

                  {{ item.period }}
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <div v-else-if="item.outcome == 'declined'">
          <Disclosure as="div" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">{{
                  item.period
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <ul class="list-none">
                <li>
                  <span class="font-bold mr-2">Outcome: </span>
                  {{ item.outcome }}
                </li>
                <li v-if="item.payday">
                  <span class="font-bold mr-2">Payday: </span>{{ item.payday }}
                </li>
                <li>
                  <span class="font-bold mr-2">Filed:</span>

                  {{ item.period }}
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <div v-else-if="item.outcome == 'pending'">
          <Disclosure as="div" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">{{
                  item.period
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <ul class="list-none">
                <li>
                  <span class="font-bold mr-2">Outcome: </span>
                  {{ item.outcome }}
                </li>
                <li v-if="item.payday">
                  <span class="font-bold mr-2">Payday: </span>{{ item.payday }}
                </li>
                <li>
                  <span class="font-bold mr-2">Filed:</span>

                  {{ item.period }}
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
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
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  data: Object,
});
let sortedData = ref([...props.data.outcomes]);
sortedData.value.sort((a, b) => {
  const dateA = new Date(a.filed);
  const dateB = new Date(b.filed);

  if (dateA > dateB) {
    return -1;
  } else if (dateA < dateB) {
    return 1;
  } else {
    return 0;
  }
});
</script>
