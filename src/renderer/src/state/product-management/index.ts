import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

export const useProductManagement = createGlobalState(() => {
  const selectedProductId = ref<string | null>();

  return { selectedProductId };
});