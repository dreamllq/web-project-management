<template>
  <div class='projects-header'>
    <el-button type='primary' @click='onAddProject'>
      添加项目
    </el-button>
  </div>
  <project-add-dialog ref='projectAddDialogRef' @success='onAddSuccess' />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProjectAddDialog from '../project-info/add-dialog.vue';

const emit = defineEmits(['add-success']);

const projectAddDialogRef = ref<InstanceType<typeof ProjectAddDialog>>();

const onAddProject = () => {
  projectAddDialogRef.value!.show();
};

const onAddSuccess = () => {
  emit('add-success');
};

</script>

<style scoped>

</style>