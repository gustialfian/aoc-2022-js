const fs = require('fs/promises');


(async () => {
    const part = process.argv[2] ?? '1'
    const path = process.argv[3] ?? 'sample.txt'
    const input = await fs.readFile(`${__dirname}/${path}`, { encoding: 'utf8' });

    console.time()
    const got = part === '1' ? solution1(input) : solution2(input)
    console.timeEnd()

    console.log(got)
})()

function solution1(input) {
    return solution(4, input)
}

function solution2(input) {
    return solution(14, input)
}

const solution = (size, input) => {
    for (let i = 0; i < input.length-size+1; i++) {
        const end = i + size
        const segment = input.slice(i, end)
        if (check(size, segment)) {
            return end
        }
    }
}

const check = (size, str) => {
    const s = new Set(str)
    return s.size === size
}

