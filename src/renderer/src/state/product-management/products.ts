import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/type';

export const useProducts = createGlobalState(() => {
  const products = ref<Product[]>([]);

  const addProduct = (product:{ name: string }) => {
    products.value.push({
      id: uuidv4(),
      ...product,
      children: []
    });
  };

  return {
    products,
    addProduct 
  };
});