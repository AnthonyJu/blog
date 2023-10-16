import { exec } from 'node:child_process'
import { getDate } from '../date.js'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  const { date, timestamp } = getDate()

  // 自定义打开文件action
  plop.setActionType('openFile', (answers, config) => {
    exec(`code ${config.path}`)
  })

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
      {
        type: 'openFile',
        path: `./src/pages/roast/roastList.ts`,
      },
    ],
  })
}
