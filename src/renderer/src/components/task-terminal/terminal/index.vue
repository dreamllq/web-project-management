<template>
  <div class='terminal-inner'>
    <template v-for='item in record' :key='item.id'>
      <p>{{ item.data }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useTaskTerminal } from '@/state/product-management/task-terminal';
import { computed } from 'vue';

const { taskOutMap, selectedTaskId } = useTaskTerminal();

const record = computed(() => selectedTaskId.value ? taskOutMap.value[selectedTaskId.value!].record : []);
</script>

<style scoped lang="scss">
.terminal-inner{
  padding: 8px;
  font-size: 14px;
  color: var(--el-text-color-regular);
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>