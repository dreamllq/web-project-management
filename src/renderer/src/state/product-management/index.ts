import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

export const useProductManagement = createGlobalState(() => {
  const selectProjectId = ref<string | null>();

  return { selectProjectId };
});