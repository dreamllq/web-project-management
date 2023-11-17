<template>
  <div ref='terminalInnerRef' class='terminal-inner'>
    <div ref='xtermContainerRef' class='xterm-container' />
  </div>
</template>

<script setup lang="ts">
import { useTaskTerminal } from '@/state/product-management/task-terminal';
import { computed, onMounted, ref, watch } from 'vue';
import { Terminal } from 'xterm';
import { useElementSize } from '@vueuse/core';
import 'xterm/css/xterm.css';

const { taskOutMap, selectedTaskId } = useTaskTerminal();
const terminalInnerRef = ref<HTMLElement>();
const xtermContainerRef = ref<HTMLElement>();
const { width, height } = useElementSize(terminalInnerRef);

let xterm:Terminal;

onMounted(() => {
  xterm = new Terminal({
    convertEol: true,
    fontSize: 12,
    rows: Math.floor((terminalInnerRef.value!.offsetHeight - 16) / 14),
    cols: Math.floor((terminalInnerRef.value!.offsetWidth - 16) / 7.2),
    letterSpacing: 0.0025 
  });
  xterm.open(xtermContainerRef.value!);
  xterm?.write(record.value.reduce((acc, item) => acc + item.data, ''));
});

const record = computed(() => (selectedTaskId.value && taskOutMap.value[selectedTaskId.value!]) ? taskOutMap.value[selectedTaskId.value!].record : []);

watch(() => record, async () => {
  xterm?.clear();
  xterm?.write(record.value.reduce((acc, item) => acc + item.data, '') + '\n');
}, { deep: true });


watch(() => [width.value, height.value], () => {
  xterm.resize(Math.floor((width.value - 16) / 7.2), Math.floor((height.value - 16) / 14));
}, { deep: true });
</script>

<style scoped lang="scss">
.terminal-inner{
  padding: 8px;
  background-color: #000;
  font-size: 14px;
  color: var(--el-text-color-regular);
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.xterm-container{
  position: relative;
  overflow: hidden;
}
</style>