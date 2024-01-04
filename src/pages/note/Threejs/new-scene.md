---
title: 新建场景
meta:
  - name: description
    content: 以 CDN 方式创建一个基础场景。
  - name: keywords
    content: New Scene，CDN
---

<route lang="yaml">
meta:
  title: 新建场景
  keywords: [New Scene，CDN]
  date: 2023-12-02 19:45:29
</route>

# 新建场景

以 CDN 方式创建一个基础场景。

## 代码

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
      }

      html,
      body {
        margin: 0;
      }
    </style>

    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.159.0/build/three.module.js",
          "three/addons/": "https://unpkg.com/three@0.159.0/examples/jsm/"
        }
      }
    </script>
  </head>

  <body>
    <script type="module">
      import * as THREE from 'three'
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
      import Stats from 'three/addons/libs/stats.module.js'
      import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
      import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
      import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
      import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: '#409eff' })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5

      const controls = new OrbitControls(camera, renderer.domElement)

      const composer = new EffectComposer(renderer)
      const renderPass = new RenderPass(scene, camera)
      composer.addPass(renderPass)
      const smaaPass = new SMAAPass(
        window.innerWidth * renderer.getPixelRatio(),
        window.innerHeight * renderer.getPixelRatio(),
      )
      composer.addPass(smaaPass)
      const outputPass = new OutputPass()
      composer.addPass(outputPass)

      const stats = new Stats()
      document.body.appendChild(stats.dom)

      function animate() {
        requestAnimationFrame(animate)

        stats.begin()

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        controls.update()

        composer.render()

        renderer.render(scene, camera)

        stats.end()
      }

      window.addEventListener('resize', onWindowResize)

      function onWindowResize() {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
        composer.setSize(width, height)
      }

      animate()
    </script>
  </body>
</html>
```
