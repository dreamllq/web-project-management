<template>
  <el-dialog
    v-model='visible'
    title='项目设置'
    width='70%'
    append-to-body
    @open='showBody=true'
    @closed='showBody=false'
  >
    <template v-if='showBody'>
      <el-tabs v-model='activeName'>
        <el-tab-pane label='脚本设置' name='scriptSetting'>
          <script-setting />
        </el-tab-pane>
      </el-tabs>
    </template>
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='visible = false'>关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ScriptSetting from './script-setting.vue';

const visible = ref(false);
const showBody = ref(false);

const activeName = ref('scriptSetting');
const projectId = ref('');

const show = (id: string) => {
  projectId.value = id;
  visible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>