---
title: git commit 提交规范
---

<route lang="yaml">
meta:
  title: git commit 提交规范
  keywords: [Git commit, Specification]
  date: 2023-06-16 22:10:28
</route>

# git commit 提交规范

## 一、commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```markdown
<type>(<scope>): <subject>
<!-- BLANK LINE -->
<body>
<!-- BLANK LINE -->
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

## 二、type

type 用于说明 commit 的类别，只允许使用下面 7 个标识。

```markdown
feat：新功能（feature）
fix：修补 bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

如果 type 为 feat 和 fix，则该 commit 将肯定出现在 Change log 之中。

## 三、scope

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

## 四、subject

subject 是 commit 目的的简短描述，不超过 50 个字符。

## 五、body

body 部分是对本次 commit 的详细描述，可以分成多行。

## 六、footer

footer 部分只用于两种情况。

- 不兼容变动
  如果当前代码与上一个版本不兼容，则 footer 部分以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动理由和迁移方法。
- 关闭 Issue
  如果当前 commit 针对某个 issue，那么可以在 footer 部分关闭这个 issue 。

```markdown
Closes #234
```

## 参考资料

> [git commit 提交规范](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
