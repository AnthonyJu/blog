import { getDate } from '../date.js'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  const { date, year, realMonth, realDay } = getDate()

  plop.setGenerator('blog', {
    description: '创建一个blog：',
    prompts: [
      {
        type: 'input',
        name: 'fileName',
        message: '请输入blog文件夹名称：',
      },
      {
        type: 'input',
        name: 'title',
        message: '请输入blog标题：',
      },
      {
        type: 'input',
        name: 'desc',
        message: '请输入blog描述：',
      },
      {
        type: 'input',
        name: 'keywords',
        message: '请输入blog关键词：',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `../../src/pages/blog/${year}/${realMonth}/${realDay}/{{fileName}}/index.md`,
        templateFile: './index.md.hbs',
        data: {
          date,
          title: '{{title}}',
          desc: '{{desc}}',
          keywords: '{{keywords}}',
        },
      },
    ],
  })
}
