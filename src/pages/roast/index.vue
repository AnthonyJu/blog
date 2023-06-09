<template>
  <div>
    <div v-for="item in roastList" :key="item.id" flex>
      <img class="w-64px rounded-50% shadow" border="~ gray-500" src="@/assets/avatar.png" alt="AnthonyJu">
      <div class="roast-content ml-20px bg-red p-8px">
        <p>
          {{ item.content }}
        </p>
        <div class="flex-center-r text-14px">
          <div i-carbon-calendar-heat-map mr-5px />
          <span>{{ item.date }}</span>
        </div>
      </div>
    </div>
    <Pagination v-model="current" m-auto w-fit :total="roastList.length" />
  </div>
</template>

<script setup lang="ts">
import allRoastList from './roastList'

const current = ref(1)

const roastList = computed(() => {
  const start = (current.value - 1) * 15
  const end = current.value * 15
  return allRoastList.slice(start, end)
})
</script>

<style lang="scss" scoped>
// .roast-content {
//   position: relative;

//   &::before {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 0;
//     height: 0;
//     margin-top: -10px;
//     margin-left: -10px;
//     content: '';
//     border: 10px solid transparent;
//     border-right: 0;
//     border-bottom: 0;
//     border-left-color: red;
//   }
// }
</style>
