<template>
  <el-form ref='formRef' label-position='top' :model='form'>
    <el-form-item label='项目名称' prop='name'>
      <el-input v-model='form.name' placeholder='请输入项目名称' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { PropType, reactive, ref } from 'vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{ name: string }>,
    default: () => ({ name: '' }) 
  } 
});

const form = reactive({ name: props.defaultData.name });
const formRef = ref();

const getData = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    return cloneDeep(form);
  }
};

defineExpose({ getData });
</script>

<style scoped>

</style>