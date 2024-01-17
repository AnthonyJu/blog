---
title: 配置 github 的 hosts
meta:
  - name: description
    content: 通过在 hosts 文件中配置 github 域名对应的 IP 来加速访问。
  - name: keywords
    content: GitHub, hosts
---

<route lang="yaml">
meta:
  title: 配置 github 的 hosts
  keywords: [GitHub, hosts]
  date: 2024-01-17 20:50:05
</route>

# 配置 github 的 hosts

通过在 hosts 文件中配置 github 域名对应的 IP 来加速访问。

## hosts 文件的作用

hosts 文件是一个没有扩展名的文本文件，它可以用来映射 IP 地址和域名。当系统要访问一个网址时，会首先在 hosts 文件中查找是否有这个网址对应的 IP 地址，如果有就直接访问，如果没有就向 DNS 服务器发送请求，获取域名对应的 IP 地址。

## hosts 文件的位置

### Windows

hosts 文件的位置在：

```bash
C:\Windows\System32\drivers\etc
```

### Mac OS

hosts 文件的位置在：

```bash
/etc/hosts
```

## 添加 github 的 hosts

- `Windows`可以通过`记事本`或其他编辑器打开 hosts 文件。
- `MacOS`可以通过 vim 打开 hosts 文件：

```bash
sudo vim /etc/hosts
```

在 hosts 文件中添加以下内容：

```txt
# GitHub
140.82.114.4 github.com
```
