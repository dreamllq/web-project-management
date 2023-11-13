<template>
  <el-form ref='formRef' label-position='top' :model='form'>
    <el-form-item label='项目名称' prop='name'>
      <el-input v-model='form.name' placeholder='请输入项目名称' />
    </el-form-item>
    <el-form-item label='git克隆地址' prop='gitCloneUrl'>
      <el-input v-model='form.gitCloneUrl' placeholder='请输入git克隆地址' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, reactive, ref } from 'vue';
import { useProductManagement } from '@/state/product-management';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{ name: string; gitCloneUrl: string }>,
    default: () => ({
      name: '',
      gitCloneUrl: '' 
    }) 
  } 
});

const { selectedProductId } = useProductManagement();

const form = reactive({
  name: props.defaultData.name,
  gitCloneUrl: props.defaultData.gitCloneUrl 
});
const formRef = ref();

const getData = async () => {
  await formRef.value.validate();
  return {
    ...form,
    productId: selectedProductId.value!
  };
};

defineExpose({ getData });
</script>

<style scoped>

</style>