<template>
  <div>
    1
  </div>
</template>

<script setup lang="ts">
import api from '@/services/api';
import { onMounted, ref } from 'vue';

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
});

const scripts = ref<{
  script: string;
  shell: any;
  type: 'npm';
}[]>([]);

onMounted(async() => {
  const res = await api.project.getProjectScripts({ id: props.projectId });

  scripts.value = res.npm.map(item => ({
    ...item,
    type: 'npm'
  }));
});
</script>

<style scoped>

</style>