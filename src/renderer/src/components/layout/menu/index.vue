<template>
  <div class='menu-inner'>
    <menu-item :icon='Memo' route='/product-management' />
    <menu-item :icon='Files' route='/task-terminal' />
  </div>
</template>

<script setup lang="ts">
import MenuItem from './item.vue';
import { Memo, Files } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">

</style>