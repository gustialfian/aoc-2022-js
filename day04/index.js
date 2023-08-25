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

function soulution1(input) {
    input = input.split('\n')
    input = input.map(parse)
    input = input.filter(fullyContains)
    input = input.length
    return input
}

function soulution2(input) {
    input = input.split('\n')
    input = input.map(parse)
    input = input.filter(overlap)
    // input = input.filter(overlapBitMask)
    input = input.length
    return input
}

const parse = x => x.match(/(\d+)-(\d+),(\d+)-(\d+)/).splice(1).map(Number)

const fullyContains = ([a, b, x, y]) => {
    return (a <= x && b >= y) || (x <= a && y >= b)
}

const overlap = ([a, b, x, y]) => {
    return (b >= x) && (a <= y)
}

const overlapBitMask = ([a, b, x, y]) => {
    const first = getMask(a, b)
    const second = getMask(x, y)
    const result = first & second
    // console.log(first.toString(2).padStart(10, 0));
    // console.log(second.toString(2).padStart(10, 0));
    // console.log(result.toString(2).padStart(10, 0));
    // console.log(!!result);
    // console.log()
    return result
}

const getMask = (a, b) => {
    const am = (1n << BigInt(a-1)) - 1n
    const bm = (1n << BigInt(b)) - 1n
    const abm = bm - am
    // console.log(bm.toString(2).padStart(10, 0), b);
    // console.log(am.toString(2).padStart(10, 0), a);
    // console.log(abm.toString(2).padStart(10, 0));
    // console.log()
    return abm
}

