<template>
  <div relative flex-center>
    <img
      class="avatar max-h-210px cursor-pointer rounded-50%"
      border="~ gray-500"
      hover="animate-spin"
      src="@/assets/avatar.png"
      alt="AnthonyJu"
      @click="$router.push('/about')"
    >

    <!-- Focusing -->
    <div
      absolute z-1 flex-center cursor-pointer rounded-18px
      class="group bottom-8% left-75% bg-$bg-color-opacity px-10px py-6px"
      cursor="default"
    >
      <span class="h-24px w-16px">🎯</span>
      <span class="clip hidden w-0 pl-6px text-12px" group-hover="w-fit block">
        Striving
      </span>
    </div>
  </div>

  <!-- Info -->
  <div px-2px>
    <div class="mt-10px text-20px font-bold">Ju Peng</div>
    <div class="relative text-18px text-dark-300 -top-2px dark:text-gray-300">AnthonyJu</div>
    <div mb-10px break-all>巴山楚水凄凉地，Responsibility。</div>
  </div>

  <!-- Btn -->
  <a class="btn mb-20px" href="https://github.com/AnthonyJu" target="_blank">
    <strong>Follow Me</strong>
    <div id="container-stars"><div id="stars" /></div>
    <div id="glow"><div class="circle" /><div class="circle" /></div>
  </a>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>
.avatar {
  box-shadow: rgba(142, 142, 142, 0.5) 0 6px 15px 0;
}

.btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  cursor: pointer;
  user-select: none;
  background-image: linear-gradient(#444444a0, #444444a0),
    linear-gradient(137.48deg, #c592ff 10%,#8991fc 45%, #5194f8 67%, rgb(27, 181, 241) 87%);
  background-clip: content-box, border-box;
  background-origin: border-box;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border: double 3px transparent;
  border-radius: 14px;
  transition: 0.5s;
  animation: gradient-301 5s ease infinite;
}

.dark .btn {
  background-image: linear-gradient(#212121cc, #212121cc),
    linear-gradient(137.48deg, #b16dff 10%,#6973ff 45%, #1a69df 67%, rgb(9, 140, 192) 87%);
}

#container-stars {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  backdrop-filter: blur(1rem);
  border-radius: 13px;
  transition: 0.5s;
}

strong {
  z-index: 2;
  font-size: 14px;
  color: #fff;
  letter-spacing: 4px;
}

#glow {
  position: absolute;
  display: flex;
  width: 100%;
}

.circle {
  z-index: -1;
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse-3011 4s infinite;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn:hover #container-stars {
  z-index: 1;
}

.btn:hover {
  transform: scale(1.1)
}

.btn:active {
  background-clip: content-box, border-box;
  background-origin: border-box;
  border: double 4px #fe53bb;
  animation: none;
}

.btn:active .circle {
  background: #fe53bb;
}

#stars {
  position: relative;
  width: 200rem;
  height: 200rem;
  background: transparent;
}

#stars::after {
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  content: '';
  background-image: radial-gradient(#fff 1px, transparent 1%);
  background-size: 50px 50px;
  animation: anim-star-rotate 90s linear infinite;
}

#stars::before {
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  content: '';
  background-image: radial-gradient(#fff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
  animation: anim-star 60s linear infinite;
}

@keyframes anim-star {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes anim-star-rotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient-301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse-3011 {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    transform: scale(0.75);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    transform: scale(1);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    transform: scale(0.75);
  }
}
</style>
