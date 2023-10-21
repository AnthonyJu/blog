<template>
  <div v-for="(item, index) in roastList" :key="item.id" mb-40px flex>
    <img
      class="h-64px w-64px rounded-50% shadow"
      border="~ gray-500"
      src="@/assets/avatar.png" alt="AnthonyJu"
    >
    <div
      class="roast-content ml-20px max-w-70% flex-col rounded px-8px py-4px text-#fff"
      :style="{ 'background': colorList[index % 5], '--before-color': colorList[index % 5] }"
    >
      <p flex flex-1 items-center text-14px v-html="item.content" />
      <div class="flex-center-r pt-4px text-14px" border="t dashed">
        <div i-carbon-calendar-heat-map mr-5px text-14px />
        <span>{{ item.date }}</span>
      </div>
    </div>
  </div>
  <Pagination v-model="current" m-auto w-fit :total="allRoasts.length" />
</template>

<script setup lang="ts">
import allRoasts from './roastList'

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', ' #00a854']

const current = ref(1)

const roastList = computed(() => {
  const start = (current.value - 1) * 15
  const end = current.value * 15
  return allRoasts.slice(start, end)
})
</script>

<style lang="scss" scoped>
.roast-content {
  position: relative;

  &::before {
    position: absolute;
    inset: 0;
    width: 0;
    height: 0;
    margin-top: 26px;
    margin-left: -5px;
    content: '';
    border: 10px solid transparent;
    border-right: 0;
    border-bottom: 0;
    border-left-color: var(--before-color);
    transform: rotate(45deg);
  }
}
</style>
