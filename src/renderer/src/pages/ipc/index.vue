<template>
  <div>
    <el-button @click='ping'>
      ping
    </el-button>
    <el-button @click='http'>
      http
    </el-button>
  </div>
</template>

<script setup lang="ts">
const ping = async () => {
  const res = await window.electron.ipcRenderer.invoke('ping');
  console.log(res);
};
const http = async () => {
  const res = await window.electron.ipcRenderer.invoke('http', {
    a: 1,
    b: 2 
  });
  console.log(res);
  
};
</script>

<style scoped>

</style>

<route>
  {
    name: "ipc"
  }
</route>