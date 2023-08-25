const fs = require('fs/promises');


(async () => {
    const part = process.argv[2] ?? '1'
    const inputPath = process.argv[3] ?? 'sample.txt'
    const input = await fs.readFile(`${__dirname}/${inputPath}`, { encoding: 'utf8' });

    console.time()
    const got = part === '1' ? soulution1(input) : soulution2(input)
    console.timeEnd()

    console.log(got)
})()

const sum = (acc, cur) => acc + Number(cur)

function soulution1(input) {
    let result = 0

    input = input.split('\n\n')
    for (const v of input) {
        const x = v.split('\n')
        const cur = x.reduce(sum, 0)
        result = Math.max(result, cur)
    }

    return result
}


function soulution2(input) {
    let result = 0

    input = input.split('\n\n')
    const list = []
    for (const v of input) {
        const x = v.split('\n')
        const cur = x.reduce(sum, 0)
        list.push(cur)
    }
    
    result = list.toSorted((a, b) => b - a).slice(0, 3).reduce(sum, 0)
    
    return result
}

