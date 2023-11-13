<template>
  <div class='layout-inner'>
    <div class='layout-menu-wrapper'>
      <l-menu />
    </div>
    <div class='container-wrapper'>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import LMenu from './menu/index.vue';
</script>

<style scoped lang="scss">
.layout-inner{
  display: flex;
  width: 100%;
  height: 100%;

  .layout-menu-wrapper{
    flex: none;
    width: 50px;
    border-right: 1px solid var(--el-border-color);
    background-color: var(--el-fill-color-darker);
  }

  .container-wrapper{
    flex: 1;
    overflow: hidden;
  }
}
</style>