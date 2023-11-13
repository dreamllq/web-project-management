<template>
  <el-dialog
    v-model='visible'
    title='编辑'
    width='500px'
    append-to-body
    @open='showBody=true'
    @closed='showBody=false'
  >
    <biz-form v-if='showBody && loadEnd' ref='bizFormRef' :default-data='defaultData' />
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='visible = false'>取消</el-button>
        <el-button type='primary' @click='onSubmit'>
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BizForm from './form.vue';
import api from '@/services/api';

const visible = ref(false);
const showBody = ref(false);

const bizFormRef = ref<InstanceType<typeof BizForm>>();

const emit = defineEmits(['success']);

const onSubmit = async () => {
  const data:{ dir: string } = await bizFormRef.value!.getData();
  await api.product.updateProductDir({
    id: id.value,
    dir: data.dir 
  });
  visible.value = false;
  emit('success');
};

const id = ref('');
const defaultData = ref({ dir: '' });
const loadEnd = ref(false);

const show = async (data:{ id: string }) => {
  loadEnd.value = false;
  visible.value = true;
  id.value = data.id;
  

  const product = await api.product.getProduct({ id: data.id });
  defaultData.value.dir = product.dir || '';

  loadEnd.value = true;
};

defineExpose({ show });

</script>

<style scoped>

</style>