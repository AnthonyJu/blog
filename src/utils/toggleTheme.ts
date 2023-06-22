// 使用view-transition进行主题过渡
export function toggleTheme(e: MouseEvent) {
  // 不支持view-transition则直接切换主题
  // @ts-expect-error failed to resolve types
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  const x = e.clientX
  const y = e.clientY
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  // @ts-expect-error failed to resolve types
  const trans = document.startViewTransition(() => {
    toggleDark()
    const root = document.documentElement
    root.classList.remove(isDark.value ? 'light' : 'dark')
    root.classList.add(isDark.value ? 'dark' : 'light')
  })

  trans.ready.then(() => {
    const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${radius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${isDark.value ? 'new' : 'old'}(root)`,
      },
    )
  })
}
