<template>
  <div class='product-item' :class='{selected: selectProjectId === product.id}' @click='onSelect'>
    <div class='product-item__info'>
      <span>{{ product.name }}</span>
    </div>
    <div class='product-item__operate'>
      <el-dropdown style='vertical-align: baseline;' trigger='click' @command='handleCommand'>
        <el-button :icon='More' link />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon='Edit' command='edit'>
              编辑
            </el-dropdown-item>
            <el-dropdown-item :icon='Delete' command='delete'>
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <edit-product-info-dialog ref='editProductInfoDialogRef' @success='onEditSuccess' />
  </div>
</template>

<!-- eslint-disable indent -->
<script setup lang="ts">
import { PropType, ref } from 'vue';
import { Product } from '@/type';
import { More, Edit, Delete } from '@element-plus/icons-vue';
import EditProductInfoDialog from '../product-info/edit-dialog.vue';
import { ElMessageBox } from 'element-plus';
import api from '@/services/api';
import { useProductManagement } from '@/state/product-management';


const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const { selectProjectId } = useProductManagement();

const editProductInfoDialogRef = ref();

const emit = defineEmits(['edit-success', 'delete-success']);

const onSelect = () => {
  selectProjectId.value = props.product.id;
};

const handleCommand = (command: 'edit' | 'delete') => {
  switch (command) {
    case 'edit' :
      onEdit();
      break;

    case 'delete' :
      onDelete();
      break;

    default :
      break;
  }
};

const onEdit = () => {
  console.log('edit');
  editProductInfoDialogRef.value.show({ id: props.product.id });
};

const onDelete = async () => {
  console.log('delete');
  await ElMessageBox.confirm('确认删除此产品吗？', '确认');
  await api.product.deleteProduct({ id: props.product.id });
  emit('delete-success');
};

const onEditSuccess = () => {
  emit('edit-success');
};
</script>

<style scoped lang="scss">
.product-item{
  padding: 8px;
  line-height: 30px;
  border-bottom: 1px solid  var(--el-border-color);
  display: flex;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:hover{
    background-color: var(--el-bg-color-page);
  }

  &.selected{
    background-color: var(--el-bg-color-page);

    .product-item__info{
      color: var(--el-text-color-primary); 
    }
  }

  .product-item__info{
    flex: 1;
    overflow: hidden;
    font-size: 14px;
    color: var(--el-text-color-regular);
  }
  .product-item__operate{
    flex: none;
    line-height: 30px;
  }
}
</style>