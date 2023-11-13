<template>
  <el-form ref='formRef' label-position='top' :model='form'>
    <el-form-item label='开发目录' prop='dir'>
      <div style='word-break: break-all;'>
        <span>{{ form.dir }}</span>
      </div>
      <div>
        <el-button @click='onSelectFolder'>
          选择目录
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { PropType, reactive, ref } from 'vue';
import api from '@/services/api';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{ dir: string }>,
    default: () => ({ dir: '' }) 
  } 
});

const form = reactive({ dir: props.defaultData.dir });
const formRef = ref();

const onSelectFolder = async () => {
  const d = await api.utils.selectFolder();
  form.dir = d;
  
};

const getData = async () => {
  await formRef.value.validate();
  return cloneDeep(form);
};

defineExpose({ getData });
</script>

<style scoped>

</style>