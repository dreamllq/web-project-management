<template>
  <div class='product-list'>
    <template v-for='item in products' :key='item.id'>
      <product-item :product='item' @edit-success='onEditSuccess' @delete-success='onDeleteSuccess' />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductManagement } from '@/state/product-management/index';
import ProductItem from './product-item.vue';

const { products, loadProducts } = useProductManagement();
onMounted(async () => {
  loadProducts();
});

const onEditSuccess = () => {
  refresh();
};

const onDeleteSuccess = () => {
  refresh();
};

const refresh = async () => {
  loadProducts();
};

defineExpose({ refresh });

</script>

<style scoped lang="scss">
.product-list{
}
</style>