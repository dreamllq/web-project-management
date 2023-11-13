<template>
  <div class='menu-item-inner' :class='{"selected":route === currentRoute.path}' @click='onJump'>
    <el-icon :size='24' style='vertical-align: middle;'>
      <component :is='icon' />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  icon: {
    type: Object,
    default: undefined
  },
  route: {
    type: String,
    default: ''
  }
});

const currentRoute = useRoute();
const router = useRouter();

const onJump = () => {
  router.replace(props.route);
};

</script>

<style scoped lang="scss">
.menu-item-inner{
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  color: var(--el-text-color-regular);

  &:hover{
    background-color: var(--el-border-color-dark);
    color: var(--el-text-color-primary);
  }

  &.selected{
    background-color: var(--el-border-color-dark);
    color: var(--el-text-color-primary);
  }
}
</style>