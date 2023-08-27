import axios from 'axios'

// 检查博客是否有更新
export async function checkUpdate() {
  // 开发环境不检查更新
  if (import.meta.env.DEV) return

  const { data } = await axios.get('/about')
  const dom = document.createElement('div')
  dom.innerHTML = data

  const oldSrc = (dom.querySelector('script[type="module"]') as HTMLScriptElement)?.src
  const newSrc = (document.querySelector('script[type="module"]') as HTMLScriptElement)?.src

  if (oldSrc !== newSrc) {
    // 创建一个倒计时组件
    const Countdown = defineComponent({
      data() {
        return {
          countdown: 5,
        }
      },
      mounted() {
        setInterval(() => {
          this.countdown--
          if (this.countdown === 0) location.reload()
        }, 1000)
      },
      render() {
        return h('div', `页面将在 ${this.countdown} 秒后刷新！`)
      },
    })

    // 提示博客有更新
    ElNotification.success({
      title: '博客有更新啦',
      message: h(Countdown, { seconds: 5 }),
      duration: 0,
    })
  }
}
