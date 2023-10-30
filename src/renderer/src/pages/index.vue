<template>
  <div>
    <router-link :to='{name: "demo"}'>
      demo1
    </router-link>
    <router-link :to='{name: "ipc"}'>
      ipc
    </router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>

<route>
  {
    name: "index"
  }
</route>