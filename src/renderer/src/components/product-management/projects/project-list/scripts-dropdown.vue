<template>
  <el-dropdown style='vertical-align: middle; margin-left: 12px;' trigger='click'>
    <el-button
      v-if='row.hasCloned'
      :icon='VideoPlay'
      link
      type='primary'
    />
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for='item in scripts' :key='item.script'>
          <el-dropdown-item @click='onRunScript(item)'>
            {{ item.script }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { PropType, onMounted, ref } from 'vue';
import { VideoPlay } from '@element-plus/icons-vue';
import api from '@/services/api';

const props = defineProps({
  row: {
    type: Object as PropType<{ id: string; hasCloned: boolean }>,
    required: true
  }
});

const scripts = ref<{
  script: string;
  shell: any;
  type: 'npm';
}[]>([]);

onMounted(async() => {
  const res = await api.project.getProjectScripts({ id: props.row.id });

  scripts.value = res.npm.map(item => ({
    ...item,
    type: 'npm'
  }));
});

const onRunScript = async (item:{
  script: string;
  shell: any;
  type: 'npm';
}) => {
  console.log(item);
  await api.project.runProjectScript({
    id: props.row.id,
    script: {
      script: item.script,
      shell: item.shell,
      type: item.type
    }
  });
};
</script>

<style scoped>

</style>