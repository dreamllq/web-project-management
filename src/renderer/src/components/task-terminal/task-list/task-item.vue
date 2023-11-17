<template>
  <div class='task-item-inner' :class='{selected: selectedTaskId === id}'>
    <div class='task-name'>
      {{ name }}
    </div>
    <div class='task-status'>
      <template v-if='!task.end'>
        <el-icon class='is-loading' style='vertical-align: middle;'>
          <loading />
        </el-icon>
        <i class='iconfont icon-stop' @click='onTaskKill' />
      </template>
      <template v-else>
        <el-icon>
          <check />
        </el-icon>
        <el-icon style='margin-left: 12px;' @click='onDelete'>
          <delete />
        </el-icon>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskTerminal } from '@/state/product-management/task-terminal';
import { computed } from 'vue';
import { Loading, Check, Delete } from '@element-plus/icons-vue';
import api from '@/services/api';

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

const onTaskKill = () => {
  api.terminalTask.killTerminalTask({ id: props.id });
};

const onDelete = () => {
  api.terminalTask.deleteTerminalTask({ id: props.id });
};
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

    i.iconfont{
      font-size: 14px;
      vertical-align: middle;
      color: var(--el-text-color-primary); 
      margin-left: 12px;
      cursor: pointer;
    }
  }
}
</style>