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
    input = input.split('\n')
    input = createTree(input);
    const acc = []
    const pred = (x) => x <= 100_000
    findDirSum(acc, pred, input)
    return acc.reduce((acc, v) => acc + v, 0)
}

function solution2(input) {
    input = input.split('\n')
    input = createTree(input);

    const acc = []
    const pred = (_) => true
    findDirSum(acc, pred, input)

    const totalSpace = 70_000_000
    const needSpace = 30_000_000
    const remainSpace = totalSpace - acc.slice(-1)
    
    let result = []
    result = acc.filter(x => x + remainSpace >= needSpace)
    result = Math.min(...result)

    return result
}

function findDirSum(acc, pred, input) {
    const entries = Object.entries(input)

    let sum = 0
    for (const [k, v] of entries) {
        if (typeof v === 'object') {
            sum += findDirSum(acc, pred, input[k])
            continue
        }
        if (typeof v === 'number') {
            sum += v
            continue
        }
    }

    if (pred(sum)) {
        acc.push(sum)
    }
    return sum
}

function createTree(input) {
    let root = null;
    let node = null;
    let path = [];
    for (const l of input) {
        if (l === '$ cd /') {
            root = {};
            node = root;

            continue;
        }
        if (/^dir (\w+)/.test(l)) {
            const dir = l.match(/^dir (\w+)/)[1];
            node[dir] = {};

            continue;
        }
        if (/(\d+) .+/.test(l)) {
            const m = l.match(/(\d+) (.+)/);
            size = Number(m[1])
            fileName = m[2]
            node[fileName] = size;

            continue;
        }
        if (/\$ cd (\w+)/.test(l)) {
            const cd = l.match(/\$ cd (\w+)/)[1];
            node = node[cd];

            path.push(cd);

            continue;
        }
        if (/\$ cd ../.test(l)) {
            path.pop();

            node = root;
            for (let i = 0; i < path.length; i++) {
                node = node[path[i]];
            }

            continue;
        }
    }
    return root
}
