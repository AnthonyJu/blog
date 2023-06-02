<template>
  <div class="h-[calc(100%-60px)] w-full flex-col-center">
    <img class="w-400px" src="@/assets/404.png">
    <h3 class="m-0">
      访问的资源不存在
    </h3>
    <h2 class="m-30px">
      生活总归带点荒谬，不如去找点乐子吧
    </h2>
    <button class="mb-30px" @click="$router.push('/')">
      找乐子 GO GO GO
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: error
</route>

<style lang="scss" scoped>
button {
 display: flex;
 gap: 10px;
 align-items: center;
 justify-content: center;
 padding: 16px 24px 16px 28px;
 font-family: inherit;
 font-size: 13px;
 font-weight: 500;
 color: #516d91;
 text-transform: uppercase;
 letter-spacing: 0.4px;
  cursor: pointer;
 background-color: #E5EDF5;
 border-color: rgb(255 255 255 / 33.3%);
 border-style: solid;
 border-width: 2px;
 border-radius: 40px;
 box-shadow: -2px -1px 8px 0 #fff, 2px 1px 8px 0 rgb(95 157 231 / 48%);
 transition: 0.2s;
 transform: translate(0, 0) rotate(0deg);
}

button:hover {
 color: #7e97b8;
 background-color: #e0e8ef;
 box-shadow: -4px -2px 16px 0 #fff, 4px 2px 16px 0 rgb(95 157 231 / 48%);

}
</style>
