<template>
  <div class='task-item-inner' :class='{selected: selectedTaskId === id}'>
    {{ name }}
  </div>
</template>

<script setup lang="ts">
import { useTaskTerminal } from '@/state/product-management/task-terminal';

defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const { selectedTaskId } = useTaskTerminal();
</script>

<style scoped lang="scss">
.task-item-inner{
  font-size: 14px;
  line-height: 20px;
  padding: 8px;
  border-bottom: 1px solid  var(--el-border-color);
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  color: var(--el-text-color-regular);

  &:hover{
    background-color: var(--el-bg-color-page);
  }

  &.selected{
    background-color: var(--el-bg-color-page);
    color: var(--el-text-color-primary); 

  }
}
</style>