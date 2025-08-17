<script lang="ts" setup>
import { ref, toValue } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { resolveQueryStr } from '@aiknew/shared-ui-utils'
import { RouteHistory } from '@aiknew/shared-ui-types'
import { ElTabs, ElTabPane, ElIcon, TabPaneName } from 'element-plus'

interface Props {
  history: RouteHistory[]
}

interface Emits {
  (e: 'remove', path: string): void
}

const { history } = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()
const route = useRoute()

const currentRoute = ref(route.path)

onBeforeRouteUpdate((to) => {
  currentRoute.value = to.fullPath
})

const handleRemove = (routePath: TabPaneName) =>
  emit('remove', String(routePath))

const handleClick = ({
  paneName: path,
}: {
  paneName: TabPaneName | undefined
}) => {
  if (path && typeof path === 'string') {
    const query = resolveQueryStr(path)
    router.push({ path, query })
  }
}
</script>

<template>
  <div class="route-tab border-top">
    <el-tabs
      v-model="currentRoute"
      type="card"
      closable
      @tab-remove="handleRemove"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in history"
        :key="item.path"
        :label="toValue(item.meta.name)"
        :name="item.path"
      >
        <template #label>
          <div class="tab-item">
            <el-icon size="16" v-if="item.meta.icon">
              <component :is="item.meta.icon" />
            </el-icon>
            <span class="tab-item-name">{{ toValue(item.meta.name) }}</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.route-tab {
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 1;
  user-select: none;

  :deep(.el-tabs) {
    width: 100%;
  }

  :deep(.el-tabs__header) {
    margin: 0;
    border-bottom: none;
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    border-bottom: none;
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
    border: none;
    border-right: 1px solid var(--el-border-color-light);
  }

  :deep(.el-icon) {
    bottom: 1px;
  }

  .tab-item {
    padding: 0 20px;
    display: flex;
    align-items: center;

    .tab-item-name {
      margin-left: 6px;
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
