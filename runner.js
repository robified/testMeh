const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.gray(`----- ${file.shortName}`));
            const beforeEaches = [];
            global.beforeEach = (fn) => {
                beforeEaches.push(fn);
            };
            // global is a special keyword/variable inside nodeJS that's similar to window variable inside the browser, and will feed the it from the test file.
            global.it = (description, fn) => {
                // console.log(desc);
                beforeEaches.forEach((func) => func());
                try {
                    fn();
                    console.log(chalk.green(`OK - ${description}`));
                } catch (error) {
                    console.log(chalk.red(`X - ${description}`));
                    console.log(chalk.red('\t', error.message));
                }
            };
            try {
                require(file.name);
            } catch (error) {
                console.log(chalk.red(error));
            }
        }
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath);

        for (let file of files) {
            const filepath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({ name: filepath, shortName: file });
            } else if (stats.isDirectory()) {
                const childFiles = await fs.promises.readdir(filepath);

                files.push(...childFiles.map((f) => path.join(file, f)));
            }
        }
    }
}

module.exports = Runner;
