<template>
  <div class='task-item-inner' :class='{selected: selectedTaskId === id}'>
    <div class='task-name'>
      {{ name }}
    </div>
    <div class='task-status'>
      <el-icon v-if='!task.end' class='is-loading'>
        <loading />
      </el-icon>
      <el-icon v-else>
        <check />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskTerminal } from '@/state/product-management/task-terminal';
import { computed } from 'vue';
import { Loading, Check } from '@element-plus/icons-vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const { selectedTaskId, taskOutMap } = useTaskTerminal();

const task = computed(() => taskOutMap.value[props.id]);
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
  display: flex;
  width: 100%;

  &:hover{
    background-color: var(--el-bg-color-page);
  }

  &.selected{
    background-color: var(--el-bg-color-page);
    color: var(--el-text-color-primary); 

  }

  .task-name{
    flex:1;
    overflow: hidden;
  }

  .task-status{
    flex: none;
    overflow: hidden;
  }
}
</style>