---
title: CentOS 随笔
meta:
  - name: description
    content: CentOS 随笔
  - name: keywords
    content: CentOS, Mail
---

<route lang="yaml">
meta:
  title: CentOS 随笔
  keywords: [CentOS, Mail]
  date: 2023-09-13 21:09:40
</route>

# CentOS 随笔

## 配置邮件地址与用户名

使用以下命令更改`CentOS`服务器邮件地址和用户名：

```shell
sudo postconf -e 'myhostname = xxxxx.xxx'
sudo postconf -e 'mydestination = xxxxx.xxx, localhost.localdomain, localhost'
sudo postconf -e 'myorigin = $myhostname'
sudo postconf -e 'smtpd_banner = $myhostname ESMTP'
sudo postconf -e 'smtp_generic_maps = hash:/etc/postfix/generic'
```

编辑`/etc/postfix/generic`文件：

```shell
sudo vi /etc/postfix/generic
```

并添加以下内容：

```txt
root@xxxxx.xxx    yy@xxxxx.xxx
```

更改`root`用户的注释字段为 `MyName`:

```shell
sudo usermod -c "MyName" root
```

进行映射：

```shell
sudo postmap /etc/postfix/generic
```

重启`postfix`服务：

```shell
sudo systemctl restart postfix
```

测试邮件是否修改成功：

```shell
echo "测试邮件是否修改成功。" | mail -s "邮件标题" zzzzz@zzz.zz
```

经过以上修改，你的邮箱`zz@zzz.zz`应该收到以下邮件：

```txt
   form：MyName<yy@xxxxx.xxx>
  title：邮件标题
content：测试邮件是否修改成功。
```
