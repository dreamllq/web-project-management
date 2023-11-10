<template>
  <div class='product-list'>
    <template v-for='item in products' :key='item.id'>
      <product-item :product='item' @edit-success='onEditSuccess' @delete-success='onDeleteSuccess' />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '@/services/api';
// import { useProducts } from '@/state/product-management/products';
import ProductItem from './product-item.vue';
import { Product } from '@/type';
// const { products } = useProducts();

const products = ref<Product[]>([]);
onMounted(async () => {
  products.value = await api.product.getProducts();
});

const onEditSuccess = () => {
  refresh();
};

const onDeleteSuccess = () => {
  refresh();
};

const refresh = async () => {
  products.value = await api.product.getProducts();
};

defineExpose({ refresh });

</script>

<style scoped lang="scss">
.product-list{
}
</style>