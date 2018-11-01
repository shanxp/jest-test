'use strict'

const __console = {
    error: (...msg) => {
        if (process.env.NODE_ENV !== 'test') {
            console.error(...msg)
        }
        return false
    },
    log: (...msg) => {
        if (process.env.NODE_ENV !== 'prod') {
            console.log(...msg)
        }
        return false
    }
}

const conf = {
    testEnvironment: "node",
    // automock: true,
    verbose: true,
    collectCoverage: true,
    globals: {
        __config: {
            // here you can add anything that is required in all tests, to be access by __config.****
        },
        __console,
        __baseDir: `${__dirname}`
    }
}


module.exports = conf