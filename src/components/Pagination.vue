<template>
  <el-pagination
    v-if="total > 15"
    class="mt-40px rounded-20px bg-light-100 px-10px py-4px dark:bg-dark-400"
    layout="prev, pager, next"
    :page-size="15"
    :pager-count="5"
    :current-page="modelValue"
    :total="total"
    @current-change="currentChange"
  />
</template>

<script setup lang='ts'>
defineProps<{ total: number }>()

const modelValue = defineModel()

function currentChange(cur: number) {
  modelValue.value = cur
}
</script>

<style lang="scss">
.dark .el-pagination {
  background-color: #fff1;
}
</style>
