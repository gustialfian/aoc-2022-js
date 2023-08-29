const fs = require('fs/promises');
const util = require('util');


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
    input = input.split('\n')
    input = input.map(x => x.split('').map(Number))

    const innerVis = inner(input);
    const outerVis = outer(input);

    return outerVis + innerVis.count
}

function solution2(input) {
    input = input.split('\n')
    input = input.map(x => x.split('').map(Number))

    const innerVis = inner(input);

    return innerVis.scenicScore
}

const outer = (input) => {
    const y = input.length
    const x = input[0].length

    return ((2 * x) + (2 * y)) - 4
}

const inner = (input) => {
    const result = [];
    let count = 0
    let scenicScore = 0
    for (let y = 1; y < input.length - 1; y++) {
        const row = [];
        for (let x = 1; x < input[y].length - 1; x++) {
            const [curResult, curCount] = isVisible(input, [x, y])
            scenicScore = Math.max(scenicScore, curCount)
            if (curResult) {
                count++
            }
            row.push(curCount);
        }
        result.push(row);
    }
    return {count, scenicScore, innerVisibility: result}
}


const isVisible = (map, coor) => {
    const [top, topCount] = isTopVisible(map, coor)
    const [right, rightCount] = isRightVisible(map, coor)
    const [bottom, bottomCount] = isBottomVisible(map, coor)
    const [left, leftCount] = isLeftVisible(map, coor)

    const isVisible = top || right || bottom || left;
    const count = topCount * rightCount * bottomCount * leftCount

    return [isVisible, count]
}

const isTopVisible = (map, [x, y]) => {
    const cur = map[y][x]
    let count = 0
    for (let i = (y - 1); i >= 0; i--) {
        count++
        if (map[i][x] >= cur) {
            return [false, count]
        }
    }
    return [true, count]
}

const isRightVisible = (map, [x, y]) => {
    const cur = map[y][x]
    let count = 0
    for (let i = (x + 1); i < map[y].length; i++) {
        count++
        if (map[y][i] >= cur) {
            return [false, count]
        }
    }
    return [true, count]
}

const isBottomVisible = (map, [x, y]) => {
    const cur = map[y][x]
    let count = 0
    for (let i = (y + 1); i < map.length; i++) {
        count++
        if (map[i][x] >= cur) {
            return [false, count]
        }
    }
    return [true, count]
}

const isLeftVisible = (map, [x, y]) => {
    const cur = map[y][x]
    let count = 0
    for (let i = (x - 1); i >= 0; i--) {
        count++
        if (map[y][i] >= cur) {
            return [false, count]
        }
    }
    return [true, count]
}