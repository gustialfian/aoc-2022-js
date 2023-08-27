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
    return solution(pop1, input)
}

function soulution2(input) {
    return solution(pop2, input)
}

const solution = (pop, input) => {
    const [stackStr, procedureStr] = input.split('\n\n')
    const stack = parseStack(stackStr)
    
    let procedure = procedureStr.split('\n')
    procedure = procedure.map(x => [...x.matchAll(/\d+/g)].map(m => Number(m[0])))

    procedure.forEach(x => step(pop, stack, x))

    let result = stack.map(x => x.pop())
    result = result.join('')

    return result
}

const parseStack = (input) => {
    input = input.split('\n')
    input = input.slice(0, input.length-1)
    input = input.map(x => x.replaceAll('[', ' '))
    input = input.map(x => x.replaceAll(']', ' '))
    input = input.map(x => x.split(''))
    input = transpose(input)
    input = input.map(x => x.reverse().join(''))
    input = input.filter(x => /\w/.test(x))
    input = input.map(x => x.trim().split(''))
    return input
}

const transpose = (matrix) => {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

const step = (pop, stack, input) => {
    const move = input[0]
    const from = input[1] - 1
    const to = input[2] - 1
    const xs = pop(move, stack[from])
    push(xs, stack[to])
    return stack
}

const pop1 = (n, stack) => {
    const result = []
    for (let i = 0; i < n; i++) {
        result.push(stack.pop())
    }
    return result
}

const pop2 = (n, stack) => {
    const result = []
    for (let i = 0; i < n; i++) {
        result.push(stack.pop())
    }
    return result.reverse()
}

const push = (xs, stack) => {
    for (const x of xs) {
        stack.push(x)
    }
}