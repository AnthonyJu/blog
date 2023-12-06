---
title: Unity 与 Web 数据交互
meta:
  - name: description
    content: 考虑到后面或许会有Unity 与 Web 一同使用的场景，研究了一下 Unity 如何与 Web 进行交互，并记录下来。
  - name: keywords
    content: Unity, Web, Interact
---

<route lang="yaml">
meta:
  title: Unity 与 Web 数据交互
  desc: 考虑到后面或许会有Unity 与 Web 一同使用的场景，研究了一下 Unity 如何与 Web 进行交互，并记录下来。
  keywords: [Unity, Web, Interact]
  date: 2023-12-06 19:08:07
</route>

# Unity 与 Web 数据交互

考虑到后面或许会有`Unity`与`Web`一同使用的场景，研究了一下 Unity 如何与 Web 进行交互，包含 Unity 调用 Web 方法，Web 调用 Unity 方法。

## 实现方式

1. Unity 端实现一个`jslib`文件预定义函数作为桥接。
2. `C#`脚本使用`DllImport`引入和调用预定义的函数。
3. Web 端使用`createUnityInstance`加载 Unity，然后通过`SendMessage`调用 Unity 端的函数。

## Unity 端实现

### 创建 Unity 项目

Hierarchy 中创建一个`Cube`，和一个`Canvas`，然后在`Canvas`下创建一个`Button`：

![Scene](./images/scene.png)

### 创建 jslib 文件

在 Unity 项目的`Assets`目录下创建`Plugins`文件夹，然后在`Plugins`文件夹下创建`WebBridge.jslib`文件（名称自定义），代码如下：

```
mergeInto(LibraryManager.library, {
  // 用于接收 Web 端调用的函数
  InvokeWebMethod: function (str) {
    _str = UTF8ToString(str) // 将 c# 字符串 转换为 js 字符串
    WebMethod(_str) // 调用 Web 端定义的函数
  },
})
```

### 创建调用 jslib 的 C# 脚本

在 Unity 项目的`Assets`目录下创建`Scripts`文件夹，然后在`Scripts`文件夹下创建`BtnCtrl.cs`文件，将其挂载到`Button`上，代码如下：

```cs
using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class BtnCtrl : MonoBehaviour
{
  void Start()
  {
    GetComponent<Button>().onClick.AddListener(() =>
    {
      InvokeWebMethod("Hello World");
    });
  }

  [DllImport("__Internal")]
  private static extern void InvokeWebMethod(string str);
}
```

### 创建用于 Web 端调用的 C# 脚本

在 Unity 项目的`Assets`目录下创建`Scripts`文件夹，然后在`Scripts`文件夹下创建`CubeCtrl.cs`文件，将其挂载到`Cube`上，代码如下：

```cs
using UnityEngine;

public class CubeCtrl : MonoBehaviour
{
  public void RotateX(float x)
  {
    transform.Rotate(x, 0, 0);
  }
}
```

### 编译项目

在 Unity 项目的`File`菜单中选择`Build Settings`，然后选择`WebGL`，点击`Switch Platform`（我这里已经切换完成了就会显示Build）。

![WebGL](./images/webgl.png)

点击左下角的`Player Settings`，在`Resolution and Presentation`中`WebGL Template`选择`Minimal`，在`Publishing Settings`中`Compression Format`选择`Disabled`。

![Minimal](./images/minimal.png)

![Disabled](./images/disabled.png)

点击`Build`，选择一个目录，等待打包完成，会自动打开目录，我们只需要`Build文件夹`即可，创建canvas自己在Web端完成。

![Build](./images/build.png)

## Web 端实现

固定写法，都是JS在啥框架都一样，就简单在`HTML`中写了，哈哈哈哈，直接上代码：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Unity与Web交互</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      html,
      body {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #btn {
        width: 100px;
        height: 40px;
        margin: auto;
        position: fixed;
        right: 0;
        left: 0;
        top: 10px;
        z-index: 999;
      }
    </style>
  </head>

  <body>
    <canvas id="unity-canvas"></canvas>
    <button id="btn">旋转Cube</button>

    <script>
      // UnityInstance 用于存储 Unity 实例
      let UnityInstance = null

      // buildUrl 为 Unity 打包后的文件夹路径，我改为了unity，就是上面打包的Build文件夹
      const buildUrl = './unity'
      const config = {
        dataUrl: buildUrl + '/Builds.data',
        frameworkUrl: buildUrl + '/Builds.framework.js',
        codeUrl: buildUrl + '/Builds.wasm',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'DefaultCompany',
        productName: 'WebGL',
        productVersion: '0.1',
      }

      // 设置 canvas 的宽高
      const canvas = document.querySelector('#unity-canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      })

      // 加载 Unity
      const script = document.createElement('script')
      script.src = buildUrl + '/Builds.loader.js'
      document.body.appendChild(script)
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          console.log(
            '加载中:' +
              (progress < 1 ? progress.toFixed(2) : progress) * 100 +
              '%',
          )
        })
          .then((unityInstance) => {
            // 加载完成后，将 UnityInstance 赋值给全局变量
            UnityInstance = unityInstance
          })
          .catch((message) => {
            console.log(message)
          })
      }

      // 这是 Unity 调用 Web 端的方法，在 jslib 文件中定义的函数
      function WebMethod(str) {
        alert(str)
      }

      // 前端页面向unity页面传值需用到UnityInstance.SendMessage()函数，调用格式如下：
      // SendMessage(unityObject,unityMethodName,value)
      // unityObject——unity脚本挂载对象名
      // unityMethodName——unity脚本内调用方法名（需为public方法）
      // value——前端需要传出的值
      const btn = document.getElementById('btn')
      btn.onclick = function () {
        UnityInstance.SendMessage('Cube', 'RotateX', 20)
      }
    </script>
  </body>
</html>
```

## 官方文档

https://docs.unity3d.com/cn/2020.3/Manual/webgl-interactingwithbrowserscripting.html

## 最终效果展示

<CustomFrame route="/unity-in-web" />
