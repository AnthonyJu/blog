<template>
  <div class="matted-box flex">
    <RouterLink
      v-for="item in statistics"
      :key="item.name"
      :to="item.path"
      hover="text-$text-hover"
      class="my-10px flex-col-center flex-1"
    >
      <el-badge
        :max="9"
        :value="newCount[item.name]"
        :hidden="newCount[item.name] === 0"
      >
        <span text-18px>{{ item.count }}</span>
      </el-badge>
      <span>{{ `${item.name}s` }}</span>
    </RouterLink>
  </div>

  <!-- 最新的5条toast -->
  <div
    class="matted-box mt-20px cursor-pointer px-8px"
    @click="$router.push('/roast')"
  >
    <p
      v-for="item in allRoasts.slice(0, 5)"
      :key="item.date"
      :title="`${useTimeAgo(item.date).value}：${item.content}`"
      class="truncate border-b border-#fff6 p-8px last:border-none"
    >
      {{ item.content }}
    </p>
  </div>
</template>

<script setup lang='ts'>
const { statistics } = useStatistics()
</script>

<style scoped lang='scss'>
.matted-box {
  a {
    border-right: 1px solid rgba(255, 255, 255, 0.4);

    &:last-child {
      border-right: none;
    }
  }
}

::v-deep(.el-badge__content) {
  top: 2px;
  right: calc(-10px + var(--el-badge-size) / 2);
}
</style>
