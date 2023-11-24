import { ref, watchEffect } from 'vue';
import { createGlobalState } from '@vueuse/core';
import { Product } from '@/type';
import api from '@/services/api';

export const useProductManagement = createGlobalState(() => {
  const selectedProductId = ref<string | null>(null);
  const products = ref<Product[]>([]);

  watchEffect(() => {
    if (selectedProductId.value === null && products.value.length > 0) {
      selectedProductId.value = products.value[0].id;
    } else if (products.value.length > 0 && products.value.find(item => item.id === selectedProductId.value) === undefined) {
      selectedProductId.value = products.value[0].id;
    } else if (products.value.length === 0) {
      selectedProductId.value = null;
    }
  });
  
  const loadProducts = async () => {
    products.value = await api.product.getProducts();
  };
  
  return {
    selectedProductId,
    products,
    loadProducts
  };
});