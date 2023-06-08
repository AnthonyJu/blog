<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="6">
      <div relative>
        <img
          class="rounded-50% shadow"
          border="~ gray-500"
          src="@/assets/avatar.png"
          alt="AnthonyJu"
        >
        <!-- Focusing -->
        <div
          class="group absolute bottom-8% left-80% flex-center rounded-18px bg-$bg-color-opacity p-6px"
          cursor="default"
        >
          🎯
          <span class="hidden w-0 pr-4px text-12px" group-hover="w-54px block">
            Focusing
          </span>
        </div>
      </div>
      <!-- Info -->
      <div class="mt-10px text-20px font-bold">Ju Peng</div>
      <div class="relative text-18px text-dark-300 -top-6px dark:text-gray-300">AnthonyJu</div>
      <div mb-10px>巴山楚水凄凉地，Responsibility。</div>
      <div
        h-30px w-full flex-center rounded text-light
        class="bg-#bd95ec"
      >
        Follow Me
      </div>
    </el-col>
    <el-col :xs="24" :sm="19" :lg="12">
      <div bg-red>center</div>
    </el-col>
    <el-col hidden-md-and-down :lg="6">
      <div bg-blue>right</div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
// import pages from '~pages'

// // 获取最新的5篇blog
// const latestBlogs = pages
//   .filter(page => page.path.startsWith('/blog/'))
//   .slice(0, 5)
</script>
