<template>
  <div class='products-management-wrapper'>
    <div class='products-wrapper'>
      <products />
    </div>
    <div class='project-wrapper'>
      <projects />
    </div>
  </div>
</template>

<script setup lang="ts">
import Products from '@/components/product-management/products/index.vue';
import Projects from '@/components/product-management/projects/index.vue';
</script>

<style scoped lang="scss">
.products-management-wrapper{
  // position: fixed;
  // top: 0;
  // left:0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  .products-wrapper{
    width: 300px;
    flex: none;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid var(--el-border-color);
  }

  .project-wrapper{
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
}
</style>

<route>
  {
    name: "product-management"
  }
</route>