<template>
  <div class='product-list'>
    <template v-for='item in products' :key='item.id'>
      <product-item :product='item' />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '@/state/product-management/products';
import ProductItem from './product-item.vue';
const { products } = useProducts();
</script>

<style scoped lang="scss">
.product-list{
}
</style>