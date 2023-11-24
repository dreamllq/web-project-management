<template>
  <div class='task-list-inner'>
    <div class='task-list-header'>
      <el-radio-group v-model='radio'>
        <el-radio-button v-for='state in status' :key='state' :label='state'>
          {{ locale[state] }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class='task-list-main'>
      <div v-if='taskList.length>0'>
        <template v-for='task in taskList' :key='task.id'>
          <div class='task-item-wrapper' @click='onSelectTask(task)'>
            <task-item :id='task.id' :name='task.name' />
          </div>
        </template>
      </div>
      <div v-else style='height: 100%;'>
        <el-empty description='未匹配到任务' style='height: 100%;' />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TasksNotify, useTaskTerminal } from '@/state/product-management/task-terminal';
import { computed, ref } from 'vue';
import TaskItem from './task-item.vue';

const { taskOutMap, selectedTaskId } = useTaskTerminal();
const radio = ref('running');

const status = ref(['running', 'closed']);
const locale = {
  running: '运行中',
  closed: '已完成'
};

const taskList = computed(() => Object.keys(taskOutMap.value).map(id => taskOutMap.value[id]).filter(item => {
  if (item.end) {
    return radio.value === 'closed';
  } else {
    return radio.value === 'running';
  }
}));

const onSelectTask = (task:TasksNotify) => {
  selectedTaskId.value = task.id;
};
</script>

<style scoped lang="scss">
.task-list-inner{
  display: flex;
  flex-direction: column;

  .task-list-header{
    flex: none;
    width: 100%;
    padding: 8px;
    border-bottom: 1px solid  var(--el-border-color);
  }

  .task-list-main{
    flex: 1;
    width: 100%;
  }
}
</style>