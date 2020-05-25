#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const homedir = require('os').homedir()
const { program } = require('commander')
const moment = require('moment')
const filepath = path.join(homedir, '.diary')


if(!fs.existsSync(filepath)) {
    fs.openSync(filepath, 'w')
}

program
    .version('1.0.0', '-v, --ver')
    .description('命令行日记')
    .option('-s, --show [number]', 'show diary')
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
        fs.appendFileSync(filepath, `[${moment().format("MMM Do YY")}] ${chunk}`, (err) => {
            if (err) throw err
            console.log('已经添加');
        })
        process.stdout.write(`已保存\n`)
        process.exit()
    })
} 
else if (program.show) {
    const showAll = program.show === true 
    if (showAll) {
        cp.exec(`tail ${filepath}`, (err, stdout, stderr) => {
            if (err) throw err
            console.log(stdout);
        })
    } else {
        cp.exec(`tail -n ${program.show} ${filepath}`, (err, stdout, stderr) => {
            if (err) throw err
            console.log(stdout);
        })
    }
    
} 
else {
    console.log('啥都没做');
}