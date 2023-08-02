<template>
  <header class="sticky left-0 top-0 z-10 flex-center">
    <div class="h-60px max-w-100ch w-full flex-b-c px-15px">
      <!-- Logo -->
      <div class="logo h-40px w-110px cursor-pointer" @click="$router.push('/')" />

      <div class="flex-center">
        <!--  Nav -->
        <nav v-if="width >= 600" class="flex gap-20px text-18px">
          <router-link
            v-for="item in navList"
            :key="item.path"
            :to="item.path"
            active-class="clip"
            hover="text-$text-hover"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Search -->
        <router-link
          class="ml-20px cursor-pointer text-18px"
          active-class="clip-bg text-19px"
          hover="text-$text-hover"
          to="/search"
          i-iconamoon-search
        />

        <!-- Github -->
        <a
          class="ml-20px cursor-pointer text-20px"
          hover="text-$text-hover"
          href="https://github.com/AnthonyJu/blog"
          target="_blank"
          i-carbon-logo-github
        />

        <!-- Theme -->
        <div class="ml-20px h-20px w-36px overflow-hidden">
          <div class="toggleWrapper origin-left-top scale-40">
            <input id="dn" :checked="isDark" type="checkbox" @click="toggleTheme">
            <label for="dn" class="toggle">
              <span class="toggle__handler">
                <span v-for="i in 3" :key="i" class="crater" :class="`crater--${i}`" />
              </span>
              <span v-for="i in 6" :key="i" class="star" :class="`star--${i}`" />
            </label>
          </div>
        </div>

        <!-- Burger -->
        <label v-if="width < 600" for="burger" class="burger relative ml-20px">
          <input id="burger" v-model="showBurger" type="checkbox">
          <span /><span /><span />
          <nav
            v-show="showBurger"
            class="w-80px flex-col-center gap-8px rounded bg-$bg-color py-10px"
            position="absolute right-0px top-30px"
            shadow="~ dark:shadow-gray-600"
          >
            <router-link
              v-for="item in navList"
              :key="item.path"
              :to="item.path"
              class="hover:text-#c784ed dark:hover:text-#57f0e6"
              @click="delayCloseHandle"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </label>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { width } = useWindowSize()

const navList = [
  {
    name: 'Index',
    path: '/',
  },
  {
    name: 'Blog',
    path: '/blog',
  },
  {
    name: 'Note',
    path: '/note',
  },
  {
    name: 'Roast',
    path: '/roast',
  },
  {
    name: 'About',
    path: '/about',
  },
]

const showBurger = ref(false)
function delayCloseHandle() {
  setTimeout(() => {
    showBurger.value = false
  }, 60)
}
</script>

<style lang="scss" scoped>
.logo {
  background-image: url('@/assets/logo.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 110px;
}

.dark .logo {
  background-image: url('@/assets/logo-dark.png');
}

.burger {
  position: relative;
  width: 27px;
  height: 20px;
  cursor: pointer;
  background: transparent;
}

.burger input {
  display: none;
}

.burger span {
  position: absolute;
  left: 0;
  display: block;
  width: 100%;
  height: 4px;
  background: var(--text-color);
  border-radius: 9px;
  opacity: 1;
  transition: .25s ease-in-out;
  transform: rotate(0deg);
}

.burger span:nth-of-type(1) {
  top: 0;
  transform-origin: left center;
}

.burger span:nth-of-type(2) {
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
}

.burger span:nth-of-type(3) {
  top: 100%;
  transform: translateY(-100%);
  transform-origin: left center;
}

.burger input:checked ~ span:nth-of-type(1) {
  top: 0;
  left: 6px;
  transform: rotate(45deg);
}

.burger input:checked ~ span:nth-of-type(2) {
  width: 0%;
  opacity: 0;
}

.burger input:checked ~ span:nth-of-type(3) {
  top: 19px;
  left: 6px;
  transform: rotate(-45deg);
}

.toggleWrapper {
  .toggle {
    position: relative;
    display: inline-block;
    width: 90px;
    height: 50px;
    cursor: pointer;
    background-color: #83d8ff;
    border-radius: 84px;
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .toggle__handler {
    position: relative;
    top: 3px;
    left: 3px;
    z-index: 1;
    display: inline-block;
    width: 44px;
    height: 44px;
    background-color: #ffcf96;
    border-radius: 50px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: rotate(-45deg);
  }

  .toggle__handler .crater {
    position: absolute;
    background-color: #e8cda5;
    border-radius: 100%;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .toggle__handler .crater--1 {
    top: 18px;
    left: 10px;
    width: 4px;
    height: 4px;
  }

  .toggle__handler .crater--2 {
    top: 28px;
    left: 22px;
    width: 6px;
    height: 6px;
  }

  .toggle__handler .crater--3 {
    top: 10px;
    left: 25px;
    width: 8px;
    height: 8px;
  }

  .star {
    position: absolute;
    background-color: #fff;
    border-radius: 50%;
    transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .star--1 {
    top: 10px;
    left: 35px;
    z-index: 0;
    width: 30px;
    height: 3px;
  }

  .star--2 {
    top: 18px;
    left: 28px;
    z-index: 1;
    width: 30px;
    height: 3px;
  }

  .star--3 {
    top: 27px;
    left: 40px;
    z-index: 0;
    width: 30px;
    height: 3px;
  }

  .star--4, .star--5, .star--6 {
    opacity: 0;
    transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .star--4 {
    top: 16px;
    left: 11px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .star--5 {
    top: 32px;
    left: 17px;
    z-index: 0;
    width: 3px;
    height: 3px;
    transform: translate3d(3px, 0, 0);
  }

  .star--6 {
    top: 36px;
    left: 28px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  input {
    display: none;
  }

  input:checked + .toggle {
    background-color: #749dd6;
  }

  input:checked + .toggle::before {
    color: #749ed7;
  }

  input:checked + .toggle::after {
    color: #fff;
  }

  input:checked + .toggle .toggle__handler {
    background-color: #ffe5b5;
    transform: translate3d(40px, 0, 0) rotate(0);
  }

  input:checked + .toggle .toggle__handler .crater {
    opacity: 1;
  }

  input:checked + .toggle .star--1 {
    width: 2px;
    height: 2px;
  }

  input:checked + .toggle .star--2 {
    width: 4px;
    height: 4px;
    transform: translate3d(-5px, 0, 0);
  }

  input:checked + .toggle .star--3 {
    width: 2px;
    height: 2px;
    transform: translate3d(-7px, 0, 0);
  }

  input:checked + .toggle .star--4,
  input:checked + .toggle .star--5,
  input:checked + .toggle .star--6 {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  input:checked + .toggle .star--4 {
    transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  input:checked + .toggle .star--5 {
    transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  input:checked + .toggle .star--6 {
    transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
}
</style>
