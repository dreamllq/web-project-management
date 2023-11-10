<template>
  <div class='product-header'>
    <div class='search'>
      <el-input placeholder='输入搜索内容' :suffix-icon='Search' />
    </div>
    <div class='btn-group'>
      <el-button :icon='Plus' link @click='onAdd' />
    </div>
    <product-add ref='productAddRef' @success='onAddSuccess' />
  </div>
</template>

<script setup lang="ts">
import { Plus, Search } from '@element-plus/icons-vue';
import ProductAdd from '../product-info/add-dialog.vue';
import { ref } from 'vue';

const productAddRef = ref();

const emit = defineEmits(['add-success']);

const onAdd = () => {
  productAddRef.value.show();
};

const onAddSuccess = () => {
  emit('add-success');
};

</script>

<style scoped lang="scss">
.product-header{
  padding: 12px;
  box-sizing: border-box;
  display: flex;

  .search{
    flex: 1;
    overflow: hidden;
  }

  .btn-group{
    flex: none;
    overflow: hidden;
    margin-left: 12px;
    line-height: 30px;
  }
}
</style>