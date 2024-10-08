---
title: IOS APP 上架流程
meta:
  - name: description
    content: 之前上架的 IOS APP 需要更新点东西，打包时提示证书过期了，需要换新的证书，记录下证书申请流程，及其关系。
  - name: keywords
    content: IOS, APP, Listing
---

<route lang="yaml">
meta:
  title: IOS APP 上架流程
  desc: 之前上架的 IOS APP 需要更新点东西，打包时提示证书过期了，需要换新的证书，记录下证书申请流程，及其关系。
  keywords: [IOS, APP, Listing]
  date: 2023-12-02 16:32:27
</route>

# IOS APP 上架流程

之前上架的 IOS APP 需要更新点东西，打包时提示证书过期了，需要换新的证书，记录下证书申请流程，及其关系。

## 1. 打包需要的文件

emmmm，这个下面的链接写的很详细了，直接看链接吧，uniapp官方的😆：

> iOS证书和描述文件申请：https://ask.dcloud.net.cn/article/152

## 2. 主要文件的关系

过程中一共有四个文件，其实知道了这几个文件的关系，第一步的核心部分就完成了：

> 1. 证书请求文件（`.certSigningRequest`）：在`Mac电脑`上用`钥匙串访问`生成。
> 2. 证书文件（`.cer`）：在[苹果开发者网站](https://developer.apple.com/)上，用上面的证书请求文件生成。
> 3. 描述文件（`.mobileprovision`）：在[苹果开发者网站](https://developer.apple.com/)上，用上面的证书文件生成。
> 4. 私钥文件（`.p12`）：下载`证书文件`，在`Mac电脑`上用`钥匙串访问`导出生成。

## 3. 上传发布

使用 `Transporter` APP 上传到 苹果开发者网站，更新跟发布就按正常的步骤进行下去就好（昂是的没有账号可以截图了所有就没有详细步骤，但是这部分必填的按照苹果的规范，一路下一步下去就完事了🤪）。

## 4. 注意事项

> 1. 最好保证四个文件的`文件名一致`。
> 2. 如果你保存证书文件后`无法进行导出`私钥文件，你需要把证书放到左侧的`登录栏`中（拖动不行就`复制粘贴`过去）。
> 3. 如果你的APP只是针对某些用户用的，请不要在发布时填写的任何元数据中体现。
> 4. 发布时需要提供APP截图，只能使用`苹果手机`进行`截图`。
