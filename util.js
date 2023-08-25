const sum = (acc, cur) => acc + Number(cur)

const partition = (n, xs) => {
    let result = []
    let next = xs
    for (let i = 0; i < xs.length / n; i++) {
        const x = take(n, next)
        result.push(x)
        next = next.slice(n)
    }
    return result
}

const take = (n, xs) => {
    const result = []
    for (let i = 0; i < n; i++) {
        if (xs[i] === undefined) continue
        result.push(xs[i])
    }
    return result
}

module.exports = {
    sum,
    partition,
    take,
}
// const nums = [0,1,2,3,4,5,6,7,8,9]
// console.log(take(5, nums))
// console.log(partition(3, nums))