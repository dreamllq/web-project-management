<template>
  <div class='product-item'>
    <div class='product-item__info' @click='onSelect'>
      <span>{{ product.name }}</span>
    </div>
    <div class='product-item__operate'>
      <el-dropdown style='vertical-align: baseline;' @command='handleCommand'>
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
  </div>
</template>

<!-- eslint-disable indent -->
<script setup lang="ts">
import { PropType } from 'vue';
import { Product } from '@/type';
import { More, Edit, Delete } from '@element-plus/icons-vue';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const onSelect = () => {
  
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
  
};

const onDelete = () => {
  console.log('delete');
  
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
  &:hover{
    background-color: var(--el-bg-color-page);
  }

  &.selected{
    background-color: var(--el-bg-color-page);
  }

  .product-item__info{
    flex: 1;
    overflow: hidden;
    cursor: pointer;
  }
  .product-item__operate{
    flex: none;
    line-height: 30px;
  }
}
</style>