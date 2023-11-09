<template>
  <el-dialog
    v-model='visible'
    title='新增'
    width='500px'
    append-to-body
    @open='showBody=true'
    @closed='showBody=false'
  >
    <biz-form v-if='showBody' ref='bizFormRef' />
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
import { useProducts } from '@/state/product-management/products';

const visible = ref(false);
const showBody = ref(false);

const bizFormRef = ref();
const { addProduct } = useProducts();

const onSubmit = async () => {
  const data = await bizFormRef.value.getData();
  addProduct(data);
  visible.value = false;
};

const show = () => {
  visible.value = true;
};

defineExpose({ show });

</script>

<style scoped>

</style>