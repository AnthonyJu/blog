import { getDate } from '../date.js'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  const { date, timestamp } = getDate()

  plop.setGenerator('roast', {
    description: '增加一条roast：',
    prompts: [
      {
        type: 'input',
        name: 'roast',
        message: '请输入吐槽：',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: '../../src/pages/roast/roastList.ts',
        pattern: /(\[\n\s+{)/,
        template:
          `[\n  {\n    id: ${timestamp},\n    content: '{{roast}}',\n    date: '${date}',\n  },\n  {`,
      },
    ],
  })
}
