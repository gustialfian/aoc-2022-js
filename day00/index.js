const fs = require('fs/promises');


(async () => {
    const part = process.argv[2] ?? '1'
    const path = process.argv[3] ?? 'sample.txt'
    const input = await fs.readFile(`${__dirname}/${path}`, { encoding: 'utf8' });

    console.time()
    const got = part === '1' ? soulution1(input) : soulution2(input)
    console.timeEnd()

    console.log(got)
})()

function soulution1(input) {
    return 'not impl'
}


function soulution2(input) {
    return 'not impl'
}

