const unwind = require('../');

const N = 100;

const obj = {};
const keys = [];
let tmp = obj;
for (let i = 0; i < N; i++) {
    tmp[`key${i}`] = {};
    tmp = tmp[`key${i}`];
    keys.push(`key${i}`);
}
const arr = [];
tmp.a = arr;
keys.push('a');

for (let i = 0; i < N; i++) {
    arr.push(i);
}
const keyPath = keys.join('.');

bench(
    [
        function unwinding() {
            unwind(obj, keyPath);
        },
    ],
    {
        runs: N,
    },
);
