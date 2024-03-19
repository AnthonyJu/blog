---
title: github加速、git代理
meta:
  - name: description
    content: 正常情况下进行github加速访问，github提交进行代理访问。
  - name: keywords
    content: github, git, proxy
---

<route lang="yaml">
meta:
  title: github加速、git代理
  desc: 正常情况下进行github加速访问，github提交进行代理访问。
  keywords: [github, git, proxy]
  date: 2024-03-19 20:03:28
</route>

# github加速、git代理

正常情况下进行github加速访问，github提交进行代理访问。

## 配置 github 的 hosts

通过在 hosts 文件中配置 github 域名对应的 IP 来加速访问。

## hosts 文件的作用

hosts 文件是一个没有扩展名的文本文件，它可以用来映射 IP 地址和域名。当系统要访问一个网址时，会首先在 hosts 文件中查找是否有这个网址对应的 IP 地址，如果有就直接访问，如果没有就向 DNS 服务器发送请求，获取域名对应的 IP 地址。

## hosts 文件的位置

`Windows` hosts 文件的位置在：

```bash
C:\Windows\System32\drivers\etc\hosts
```

`MacOS` hosts 文件的位置在：

```bash
/etc/hosts
```

## 打开 hosts 文件

- `Windows`可以通过`记事本`或其他编辑器打开 hosts 文件。
- `MacOS`可以通过 vim 打开 hosts 文件：

通过`vscode`打开 hosts 文件：

```bash
code C:\Windows\System32\drivers\etc\hosts
```

Mac 通过`vim`打开 hosts 文件：

```bash
sudo vim /etc/hosts
```

## 获取 github hosts 地址

github的定期更新地址：

1. https://hosts.gitcdn.top/hosts.txt
2. https://raw.hellogithub.com/hosts

## 配置 hosts 文件

将获取到的 hosts 文件内容复制到 hosts 文件中，保存即可。

如果没生效：

- `Windows`可以尝试重启电脑，或运行`ipconfig /flushdns`命令，刷新 DNS 缓存。
- `MacOS`可以尝试重启网络，或运行`sudo killall -HUP mDNSResponder; sudo dscacheutil -flushcache`命令，刷新 DNS 缓存。

> `MacOS`具体版本可查看：[Reset the DNS cache in OS X](https://support.apple.com/en-us/101481)

## 验证是否生效

在终端中运行以下命令：

```bash
ping github.com
```

## 当你学会了魔法

当你学会了`魔法`，你可以通过代理的方式来加速访问 github、git 仓库拉取推送等：

终端中运行以下命令：

```bash
git config --global http.proxy 代理地址:端口号
git config --global https.proxy 代理地址:端口号
```

取消代理：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

检查代理是否设置成功：

```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

> `代理地址:端口号`：例如：127.0.0.1:3456，具体是多少可以在你的`施法工具`中查看。
