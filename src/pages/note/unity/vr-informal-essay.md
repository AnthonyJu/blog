---
title: VR 随笔
---

<route lang="yaml">
meta:
  title: VR 随笔
  keywords: [Unity,VR,Informal Essay]
  date: 2023-08-05 22:10:28
</route>

# VR 开发中遇到的问题、解决方案、技巧等

## 1. VR 手柄按键绑定

在 Unity 顶部菜单栏选择 `Window` -> `SteamVR_Input`，打开 SteamVR Input 窗口。

在 `Action` 标签页中，选择 `Create New Action Set`，创建一个新的 Action Set，命名为 `Menu`，点击  `Save and Generate` 保存。

![SteamVR Input](./images/steamvr-input-1.png)

在 SteamVR Input 窗口中，选择 `Open Binding UI`，打开 SteamVR Input 窗口，选择当前项目，进入按键绑定界面。

![SteamVR Input](./images/steamvr-input-2.png)

选择要自定义的按键，点击编辑，找到 `Menu`，最后 `替换默认绑定` 即可，


## 2. 设置游戏中手持手柄

在目录中找到如下预制体：`SteamVR` -> `Prefabs` -> `vr_glove_left_model_slim`，设置绑定脚本中的 `Range Of Motion` 为 `With controller`。

## 3. SteamVR的按钮交互与抓取

### 3.1 Button

- Interactable脚本：`/SteamVR/InteractionSystem/Core/Scripts/Interactable.cs`

- HoverButton脚本：`/SteamVR/InteractionSystem/Core/Scripts/HoverButton.cs`

  此脚本需要一个可进行Hover的对象 `<Moving　Part>`
  该脚本有三个函数调用需要进行脚本编写实现：OnButtonUp、OnButtonDown、OnButtonIsPressed

### 3.1 Throwable

- Interactable脚本：`/SteamVR/InteractionSystem/Core/Scripts/Interactable.cs`

- Throwable脚本：`/SteamVR/InteractionSystem/Core/Scripts/Throwable.cs`

- InteractableHoverEvents脚本：
  
  `/SteamVR/InteractionSystem/Core/Scripts/InteractableHoverEvents.cs`

  此脚本需要一个可进行Hover的对象 `<Moving　Part>`

  该脚本有四个函数调用需要进行脚本编写实现：OnHandHoverBegin、OnAttachedToHand（Hand　hand）、OnDetachedFromHand（Hand　hand）

  Hand类型来自：using Valve.VR.InteractionSystem;