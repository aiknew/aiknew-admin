<script setup lang="ts">
import type { GroupPathItem } from './composables/use-file-group-path'
import { SearchScopeEnum } from './enums'
import { ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

export interface Props {
  groupPath: GroupPathItem[]
  searchScope: SearchScopeEnum
}

export interface Emits {
  (e: 'jump', value: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()

const handleClickPath = (index: number) => {
  emit('jump', index)
}
</script>

<template>
  <div class="path-info dark:bg-theme-bg-overlay bg-[#f9f9f9]">
    <div
      v-show="searchScope === SearchScopeEnum.CURRENT_GROUP"
      class="path-list"
    >
      <div
        class="path-item"
        v-for="(item, index) in groupPath"
        :key="item.groupId ?? Symbol('top')"
      >
        <span class="path-name" @click="handleClickPath(index)">
          {{ item.groupName }}
        </span>
        <el-icon
          v-if="index !== groupPath.length - 1"
          class="path-separator"
          size="13"
        >
          <ArrowRight />
        </el-icon>
      </div>
    </div>

    <div class="all-assets" v-show="searchScope === SearchScopeEnum.ALL">
      {{ t('all') }}
    </div>
  </div>
</template>

<style>
@media screen and (max-width: 768px) {
  .sub-path.el-popper {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
.path-info {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 4px;

  .path-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-height: 63px;
    padding: 2px 0;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      transition: all 0.2s ease-in-out 0s;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    .path-item {
      display: flex;
      align-items: center;
      padding: 3px 0;

      .path-name {
        cursor: pointer;
        outline: none;
        font-size: 14px;
        line-height: 1em;
        color: #666;
      }

      .path-separator {
        margin: 0 6px;
      }
    }
  }

  .all-assets {
    padding: 3px 0;
    cursor: pointer;
    outline: none;
    font-size: 14px;
    line-height: 1em;
    color: #666;
  }
}
</style>
