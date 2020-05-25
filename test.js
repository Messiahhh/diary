// const readline = require('readline')

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question('你好', (answer) => {
//     console.log('666');
//     rl.close()
// })

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('log.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

  for await (const line of rl) {
    // input.txt 中的每一行在这里将会被连续地用作 `line`。
    console.log(`Line from file: ${line}`);
  }
}

processLineByLine();