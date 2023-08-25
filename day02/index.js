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

const RPS_MAP = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',

    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS',
}

const STRATEGY_MAP = {
    X: 'LOSE',
    Y: 'DRAW',
    Z: 'WIN',
}

const SCORE_MAP = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,

    LOSE: 0,
    DRAW: 3,
    WIN: 6,
}

const MATCH_RESULT = {
    'ROCK-SCISSORS': 0,
    'ROCK-ROCK': 3,
    'ROCK-PAPER': 6,

    'PAPER-ROCK': 0,
    'PAPER-PAPER': 3,
    'PAPER-SCISSORS': 6,

    'SCISSORS-PAPER': 0,
    'SCISSORS-SCISSORS': 3,
    'SCISSORS-ROCK': 6,

    // ---
    'ROCK-LOSE': 'SCISSORS',
    'ROCK-DRAW': 'ROCK',
    'ROCK-WIN': 'PAPER',

    'PAPER-LOSE': 'ROCK',
    'PAPER-DRAW': 'PAPER',
    'PAPER-WIN': 'SCISSORS',

    'SCISSORS-LOSE': 'PAPER',
    'SCISSORS-DRAW': 'SCISSORS',
    'SCISSORS-WIN': 'ROCK',
}

const sum = (acc, cur) => acc + Number(cur)

function soulution1(input) {
    return input.split('\n')
        .map(v => v.split(' '))
        .map(([a, b]) => [RPS_MAP[a], RPS_MAP[b]])
        .map(([a, b]) => MATCH_RESULT[`${a}-${b}`] + SCORE_MAP[b])
        .reduce(sum, 0)
}


function soulution2(input) {
    return input.split('\n')
        .map(v => v.split(' '))
        .map(([a, b]) => [RPS_MAP[a], STRATEGY_MAP[b]])
        .map(([a, b]) => SCORE_MAP[MATCH_RESULT[`${a}-${b}`]] + SCORE_MAP[b])
        .reduce(sum, 0)
}

