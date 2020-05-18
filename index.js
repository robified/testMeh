#!/usr/bin/env node
console.log('Running test!!.....');

const Runner = require('./runner');
const runner = new Runner();

const run = async () => {
    await runner.collectFiles(process.cwd());
    // console.log(runner.testFiles);
    runner.runTests();
};

run();
