<template>
  <div class='projects-header'>
    <el-button type='primary' :disabled='!productInfo?.dir' @click='onAddProject'>
      添加项目
    </el-button>
    <el-button v-if='!productInfo?.dir' type='primary' @click='onEditProductDir'>
      配置开发目录
    </el-button>
    <span v-else class='dir-text'><strong>开发目录：</strong>{{ productInfo.dir }}</span>
  </div>
  <project-add-dialog ref='projectAddDialogRef' @success='onAddSuccess' />
  <product-dir-edit-dialog ref='productDirEditDialogRef' @success='onEditProductDirSuccess' />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProjectAddDialog from '../project-info/add-dialog.vue';
import { Product } from '@/type';
import api from '@/services/api';
import { useProductManagement } from '@/state/product-management';
import ProductDirEditDialog from '@/components/product-management/products/product-dir/edit-dialog.vue';

const emit = defineEmits(['add-success']);

const projectAddDialogRef = ref<InstanceType<typeof ProjectAddDialog>>();
const productDirEditDialogRef = ref<InstanceType<typeof ProductDirEditDialog>>();
const productInfo = ref<Product>();
const { selectedProductId } = useProductManagement();

onMounted(async() => {
  productInfo.value = await api.product.getProduct({ id: selectedProductId.value! });
});

const onAddProject = () => {
  projectAddDialogRef.value!.show();
};

const onEditProductDir = () => {
  productDirEditDialogRef.value!.show({ id: selectedProductId.value! });
};

const onAddSuccess = () => {
  emit('add-success');
};

const onEditProductDirSuccess = async () => {
  productInfo.value = await api.product.getProduct({ id: selectedProductId.value! });
};

</script>

<style scoped lang="scss">
.dir-text{
  font-size: 12px;
  padding-left: 12px;
  color: var(--el-text-color-regular);
}
</style>