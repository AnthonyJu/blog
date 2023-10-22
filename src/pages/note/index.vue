<template>
  <div class="clip h-30px pr-15px text-right">Some bits and pieces of notes</div>
  <div class="overflow-hidden rounded bg-#fff9 dark:bg-#0009">
    <el-collapse class="custom-collapse rounded" accordion>
      <el-collapse-item v-for="item in noteList" :key="item.name">
        <!-- collapse title -->
        <template #title>
          <span
            :class="isDark ? item.darkIcon ?? item.icon : item.icon"
            class="ml-20px mr-12px text-18px"
          />
          <span class="font-14px">{{ item.name }}</span>
        </template>

        <!-- collapse content -->
        <div class="py-5px">
          <router-link
            v-for="(note, index) in item.notes"
            :key="note.path"
            :to="note.path"
            class="flex cursor-pointer justify-between py-5px pl-55px pr-20px"
          >
            <!-- title -->
            <div class="font-14px flex-1 truncate" hover="text-$text-hover">
              {{ index + 1 }}、{{ note.title }}
            </div>

            <!-- keywords -->
            <div class="truncate text-12px" :title="note.keywords?.join('，')">
              <el-tag v-for="keyword in note.keywords" :key="keyword" class="mr-5px">
                {{ keyword }}
              </el-tag>
            </div>
          </router-link>
        </div>

        <!-- empty -->
        <div v-if="item.notes?.length === 0" class="px-20px py-12px">嘤 嘤 嘤，马上了</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang='ts'>
const noteTypes = [
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
    name: 'ArcGIS Map',
    icon: 'i-vscode-icons:file-type-map',
  },
  {
    name: 'Unity',
    icon: 'i-vscode-icons:file-type-light-shaderlab',
    darkIcon: 'i-vscode-icons:file-type-shaderlab',
  },
  {
    name: 'Markdown',
    icon: 'i-vscode-icons:file-type-markdown',
  },
  {
    name: 'Others',
    icon: 'i-vscode-icons-file-type-todo',
  },
]

const noteList = noteTypes.map((item) => {
  const typeName = `/note/${item.name.split(' ').join('-').toLowerCase()}`
  return {
    ...item,
    notes: allNotes.value.filter(note => note.path.includes(typeName)),
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
