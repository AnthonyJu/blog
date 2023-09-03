import { getDate } from '../date.js'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  const { date } = getDate()

  plop.setGenerator('note', {
    description: '创建一个note：',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: '请选择note类型：',
        choices: [
          {
            title: 'HTML',
            value: 'html',
          },
          {
            title: 'CSS',
            value: 'css',
          },
          {
            title: 'JavaScript',
            value: 'javascript',
          },
          {
            title: 'TypeScript',
            value: 'typescript',
          },
          {
            title: 'Vue',
            value: 'vue',
          },
          {
            title: 'React',
            value: 'react',
          },
          {
            title: 'NuxtJS',
            value: 'nuxtjs',
          },
          {
            title: 'NestJS',
            value: 'nestjs',
          },
          {
            title: 'Vite',
            value: 'vite',
          },
          {
            title: 'Git',
            value: 'git',
          },
          {
            title: 'ArcGIS Map',
            value: 'arcgis-map',
          },
          {
            title: 'Unity',
            value: 'unity',
          },
          {
            title: 'Markdown',
            value: 'markdown',
          },
        ],
      },
      {
        type: 'input',
        name: 'fileName',
        message: '请输入note文件名称：',
      },
      {
        type: 'input',
        name: 'title',
        message: '请输入note标题：',
      },
      {
        type: 'input',
        name: 'desc',
        message: '请输入note描述：',
      },
      {
        type: 'input',
        name: 'keywords',
        message: '请输入note关键词：',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/pages/note/{{type}}/{{fileName}}.md',
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
