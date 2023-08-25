const fs = require('fs/promises');
const { sum, partition } = require('../util');

(async () => {
    const part = process.argv[2] ?? '1'
    const inputPath = process.argv[3] ?? 'sample.txt'
    const input = await fs.readFile(`${__dirname}/${inputPath}`, { encoding: 'utf8' });

    console.time()
    const got = part === '1' ? soulution1(input) : soulution2(input)
    console.timeEnd()

    console.log(got)
})()

const search1 = (v) => {
    const a = new Set(v[0])
    return [...v[1]].find(x => a.has(x))
}

const search2 = (v) => {
    const a = new Set(v[0])
    const b = new Set(v[1])
    return [...v[2]].find(x => a.has(x) && b.has(x))
}

function soulution1(input) {
    input = input.split('\n')
    input = input.map(v => partition(v.length/2, v))
    input = input.map(search1)
    input = input.map(v => v.charCodeAt())
    input = input.map(v => v < 97 ? v - 64 + 26 : v - 64 - 32)
    input = input.reduce(sum, 0)
    return input
}


function soulution2(input) {
    input = input.split('\n')
    input = partition(3, input)
    input = input.map(search2)
    input = input.map(v => v.charCodeAt())
    input = input.map(v => v < 97 ? v - 64 + 26 : v - 64 - 32)
    input = input.reduce(sum, 0)
    return input
}

