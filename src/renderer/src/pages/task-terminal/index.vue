<template>
  <div class='task-terminal'>
    <div class='task-list-wrapper'>
      <task-list />
    </div>

    <div class='terminal-wrapper'>
      <terminal />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTaskTerminal } from '@/state/product-management/task-terminal';
import TaskList from '@/components/task-terminal/task-list/index.vue';
import Terminal from '@/components/task-terminal/terminal/index.vue';

const route = useRoute();
const { selectedTaskId } = useTaskTerminal();

if (route.query.id) {
  selectedTaskId.value = route.query.id as string;
}
</script>

<style scoped lang="scss">
.task-terminal{
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .task-list-wrapper{
    width: 300px;
    flex: none;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid var(--el-border-color);
  }

  .terminal-wrapper{
    flex: 1;
    overflow: hidden;
  }
}
</style>

<route>
  {
    name: "task-terminal"
  }
</route>