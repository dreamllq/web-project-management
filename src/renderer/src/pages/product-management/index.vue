<template>
  <div class='project-management-wrapper'>
    <div class='projects-wrapper'>
      <products />
    </div>
    <div class='terminal-wrapper'>
      2
    </div>
  </div>
</template>

<script setup lang="ts">
import Products from '@/components/product-management/products/index.vue';

</script>

<style scoped lang="scss">
.project-management-wrapper{
  position: fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  .projects-wrapper{
    width: 300px;
    flex: none;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid var(--el-border-color);
  }

  .terminal-wrapper{
    flex: 1;
    height: 100%;
  }
}
</style>

<route>
  {
    name: "product-management"
  }
</route>