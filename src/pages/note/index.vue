<template>
  <div h-30px pr-15px text-right>Some bits and pieces of notes</div>
  <div class="overflow-hidden rounded bg-#fff9 dark:bg-#0009">
    <el-collapse class="custom-collapse rounded" accordion>
      <el-collapse-item v-for="item in noteTypes" :key="item.name">
        <template #title>
          <span :class="isDark ? item.darkIcon ?? item.icon : item.icon" ml-20px mr-12px text-18px />
          {{ item.name }}
        </template>
        <div v-for="note in item.notes" :key="note.path" class="hover:bg- cursor-pointer px-20px py-12px" @click="$router.push(note.path)">
          {{ note.title }}
        </div>
        <div v-if="item.notes?.length === 0" class="px-20px py-12px">嘤 嘤 嘤，马上了</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang='ts'>
import type { Note, NoteType } from '@/types/index'
import pages from '~pages'

const noteTypes = ref<NoteType[]>([
  {
    name: 'HTML',
    icon: 'i-vscode-icons:file-type-html',
  },
  {
    name: 'CSS',
    icon: 'i-vscode-icons:file-type-css',
  },
  {
    name: 'JavaScript',
    icon: 'i-vscode-icons:file-type-js',
  },
  {
    name: 'TypeScript',
    icon: 'i-vscode-icons:file-type-typescript',
  },
  {
    name: 'Vue',
    icon: 'i-vscode-icons:file-type-vue',
  },
  {
    name: 'React',
    icon: 'i-vscode-icons:file-type-reactjs',
  },
  {
    name: 'NuxtJS',
    icon: 'i-vscode-icons:file-type-nuxt',
  },
  {
    name: 'NestJS',
    icon: 'i-vscode-icons:file-type-nestjs',
  },
  {
    name: 'Vite',
    icon: 'i-vscode-icons:file-type-vite',
  },
  {
    name: 'Git',
    icon: 'i-vscode-icons:file-type-git',
  },
  {
    name: 'Unity',
    icon: 'i-vscode-icons:file-type-light-shaderlab',
    darkIcon: 'i-vscode-icons:file-type-shaderlab',
  },
])

const allNotes = pages.filter(page => page.path.startsWith('/note/')).map((page) => {
  return {
    ...page.meta,
    path: page.path,
  }
}) as any as Note[]

noteTypes.value = noteTypes.value.map((item) => {
  return {
    ...item,
    notes: allNotes.filter(note => note.path.includes(`/note/${item.name.toLowerCase()}`)),
  }
})
</script>

<style lang="scss" scoped>
.custom-collapse {
  border: none !important;

  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;

  ::v-deep(.el-collapse-item__content) {
    padding: 0;
    border-top: 1px solid var(--el-collapse-border-color);
  }
}

.light .custom-collapse {
  --el-collapse-border-color: #c4e4ff;
}

.dark .custom-collapse {
  --el-collapse-border-color: #123b58;
}
</style>
