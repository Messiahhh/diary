#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const homedir = require('os').homedir();
const { program } = require('commander')


// fs.appendFile('./log.txt', '23333', (err) => {
//     if (err) throw err
//     console.log('已经添加');
    
// })


program
    .version('1.0.0')
    .description('命令行日记')
    .option('-s, --show <number>', 'show diary')
    .option('-i, --input', 'write diary')
program.parse(process.argv)


if (program.input) {
    process.stdout.write('今天的心情: ')
    process.stdin.on('data', (chunk) => {
        // don't work
        // cp.exec(`echo ${chunk} >> ./log.txt`, (err) => {
        //     if (err) {
        //         console.log(err);
        //     }
        // })
        fs.appendFileSync(path.join(homedir, '.diary.txt'), chunk, (err) => {
            if (err) throw err
            console.log('已经添加');
        })
        process.stdout.write(`已保存\n`)
        process.exit()
    })
} else if (program.show) {
    console.log('看日记');
} else {
    console.log('啥都没做');
}