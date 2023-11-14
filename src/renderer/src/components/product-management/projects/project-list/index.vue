<template>
  <auto-height-wrapper>
    <template #default='{size}'>
      <auto-pagination
        ref='pagination'
        :fetch-data='fetchData'
        no-pagination
        auto-init>
        <template #default='{data, indexMethod}'>
          <el-table :data='data' border :height='size.height'>
            <el-table-column type='index' :index='indexMethod' />
            <el-table-column prop='name' label='项目名' />
            <el-table-column prop='gitCloneUrl' label='git克隆地址' />
            <el-table-column label='操作'>
              <template #default='{row}'>
                <el-button
                  :icon='Edit'
                  link
                  type='primary'
                  @click='onEdit(row)' />
                <el-button
                  :icon='Delete'
                  link
                  type='danger'
                  @click='onDelete(row)' />
                <el-button
                  :icon='Download'
                  link
                  type='primary'
                  @click='onClone(row)' />
              </template>
            </el-table-column>
          </el-table>
        </template>
      </auto-pagination>
    </template>
  </auto-height-wrapper>
  <project-edit-dialog ref='projectEditDialogRef' @success='onEditSuccess' />
</template>

<script setup lang="ts">
import { AutoPagination } from 'lc-vue-auto-pagination';
import { AutoHeightWrapper } from 'lc-vue-auto-height-wrapper';
import { ref } from 'vue';
import api from '@/services/api';
import { useProductManagement } from '@/state/product-management';
import { Edit, Delete, Download } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import ProjectEditDialog from '../project-info/edit-dialog.vue';
import { useRouter } from 'vue-router';

const pagination = ref<InstanceType<typeof AutoPagination>>();
const projectEditDialogRef = ref<InstanceType<typeof ProjectEditDialog>>();

const { selectedProductId } = useProductManagement();

const router = useRouter();

const fetchData = async () => {
  const list = await api.project.getProjects({ productId: selectedProductId.value! });
  return {
    list,
    total: 0 
  };
};

const refresh = () => {
  pagination.value!.refresh();
};

const onEdit = (row:{ id: string }) => {
  projectEditDialogRef.value!.show({ id: row.id });
};

const onDelete = async (row: { id: string }) => {
  await ElMessageBox.confirm('确认删除此项目吗？', '确认');
  await api.project.deleteProject({ id: row.id });
  pagination.value!.refresh();
};

const onClone = async (row: { id: string }) => {
  await ElMessageBox.confirm('确认克隆此项目吗？', '确认');
  const res = await api.project.cloneProject({ id: row.id });
  router.push({
    name: 'task-terminal',
    query: { id: res.taskId } 
  });
};

const onEditSuccess = () => {
  refresh();
};

defineExpose({ refresh });
</script>

<style scoped>

</style>