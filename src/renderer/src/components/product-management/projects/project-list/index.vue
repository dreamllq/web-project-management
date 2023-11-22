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
            <el-table-column prop='name' label='项目名'>
              <template #default='{row}'>
                <el-button
                  v-if='projectStatus[row.id]'
                  link
                  type='primary'
                  @click='onJumpTerminal(row)'>
                  <el-icon class='is-loading'>
                    <loading />
                  </el-icon>
                  <span style='margin-left: 4px;'>{{ row.name }}</span>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop='gitCloneUrl' label='git克隆地址' show-overflow-tooltip />
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
                  v-if='!row.hasCloned'
                  :icon='Download'
                  link
                  type='primary'
                  @click='onClone(row)' />
                <el-button
                  v-if='row.hasCloned'
                  :icon='FolderOpened'
                  link
                  type='primary'
                  @click='onFolderOpened(row)' />
                <el-button
                  v-if='row.hasCloned'
                  link
                  type='primary'
                  @click='onVscodeOpened(row)'>
                  <i class='iconfont icon-vscode' />
                </el-button>
                <!-- <el-button
                  v-if='row.hasCloned'
                  :icon='Setting'
                  link
                  type='primary'
                  @click='onSetting(row)' /> -->
                  
                <scripts-dropdown v-if='row.hasCloned' :row='row' />
              </template>
            </el-table-column>
          </el-table>
        </template>
      </auto-pagination>
    </template>
  </auto-height-wrapper>
  <project-edit-dialog ref='projectEditDialogRef' @success='onEditSuccess' />
  <project-setting-dialog ref='projectSettingDialogRef' />
</template>

<script setup lang="ts">
import { AutoPagination } from 'lc-vue-auto-pagination';
import { AutoHeightWrapper } from 'lc-vue-auto-height-wrapper';
import { computed, ref, watch } from 'vue';
import api from '@/services/api';
import { useProductManagement } from '@/state/product-management';
import { Edit, Delete, Download, FolderOpened, Loading } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import ProjectEditDialog from '../project-info/edit-dialog.vue';
import { useRouter } from 'vue-router';
import { useTaskTerminal } from '@/state/product-management/task-terminal';
import ProjectSettingDialog from '../project-setting/index.vue';
import ScriptsDropdown from './scripts-dropdown.vue';

const pagination = ref<InstanceType<typeof AutoPagination>>();
const projectEditDialogRef = ref<InstanceType<typeof ProjectEditDialog>>();
const projectSettingDialogRef = ref<InstanceType<typeof ProjectSettingDialog>>();

// const taskIdMap = ref<Record<string, string>>({});

const { selectedProductId } = useProductManagement();
const { taskOutMap } = useTaskTerminal();

const runningTaskList = computed(() => Object.keys(taskOutMap.value).map(key => taskOutMap.value[key]).filter(item => item.end !== true));

const projectStatus = computed(() => runningTaskList.value.reduce((acc, item) => {
  acc[item.meta.projectId] = true;
  return acc;
}, {}));

watch(() => JSON.stringify(projectStatus.value), () => {
  refresh();
});

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
  await api.project.cloneProject({ id: row.id });
  // taskIdMap.value[row.id] = res.taskId;
};

const onJumpTerminal = (row:{ id: string }) => {
  const task = runningTaskList.value.find(item => item.meta.projectId === row.id);
  router.push({
    name: 'task-terminal',
    query: { id: task!.id } 
  });
};

const onFolderOpened = async (row: { id: string }) => {
  api.project.openFolderProject({ id: row.id });
};

const onVscodeOpened = async (row: { id: string }) => {
  api.project.openVscodeProject({ id: row.id });
};


const onEditSuccess = () => {
  refresh();
};

defineExpose({ refresh });
</script>

<style scoped>

</style>