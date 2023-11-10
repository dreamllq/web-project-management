<template>
  <div class='products'>
    <div class='header-wrapper'>
      <products-header @add-success='onAddSuccess' />
    </div>
    <div class='product-list-wrapper'>
      <product-list ref='productListRef' />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductsHeader from './header/index.vue';
import ProductList from './product-list/index.vue';

const productListRef = ref();

const onAddSuccess = () => {
  productListRef.value.refresh();
};

</script>

<style scoped lang="scss">
.products{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .header-wrapper{
    flex: none;
    border-bottom: 1px solid var(--el-border-color);
    width: 100%;
    overflow: hidden;
  }

  .product-list-wrapper{
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
}
</style>