<template>
  <el-form ref='formRef' label-position='top' :model='form'>
    <el-form-item label='产品名称' prop='name'>
      <el-input v-model='form.name' placeholder='请输入产品名称' />
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
  await formRef.value.validate();
  return cloneDeep(form);
};

defineExpose({ getData });
</script>

<style scoped>

</style>