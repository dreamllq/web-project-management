<template>
  <template v-if='selectedProductId && renderListFlag'>
    <div class='projects-inner'>
      <div class='projects-header-wrapper'>
        <project-header @add-success='onAddSuccess' />
      </div>
      <div class='project-list-wrapper'>
        <project-list ref='projectListRef' />
      </div>
    </div>
  </template>
  <template v-else>
    <el-empty description='请选择产品' />
  </template>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import ProjectHeader from './header/index.vue';
import ProjectList from './project-list/index.vue';
import { useProductManagement } from '@/state/product-management';

const { selectedProductId } = useProductManagement();
const renderListFlag = ref(true);
const projectListRef = ref();

watch(() => selectedProductId.value, async () => {
  renderListFlag.value = false;
  await nextTick();
  renderListFlag.value = true;
});

const onAddSuccess = () => {
  projectListRef.value.refresh();
};
</script>

<style scoped lang="scss">

.projects-inner{
  display:flex;
  flex-direction: column;
  height: 100%;

  .projects-header-wrapper{
    padding:12px;
    flex: none;
    box-sizing: border-box;
  }

  .project-list-wrapper{
    flex: 1;
    padding:12px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>