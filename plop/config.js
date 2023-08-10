export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  // 创建时间
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const realMonth = month < 10 ? `0${month}` : month
  const realDay = day < 10 ? `0${day}` : day
  const realHour = hour < 10 ? `0${hour}` : hour
  const realMinute = minute < 10 ? `0${minute}` : minute
  const realSecond = second < 10 ? `0${second}` : second

  plop.setHelper('date', () => {
    return `${year}-${realMonth}-${realDay} ${realHour}:${realMinute}:${realSecond}`
  })

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
        path: `../src/pages/blog/${year}/${realMonth}/${realDay}/{{fileName}}.md`,
        templateFile: './blog/index.md.hbs',
        data: {
          title: '{{title}}',
          desc: '{{desc}}',
          keywords: '{{keywords}}',
        },
      },
    ],
  })
}
