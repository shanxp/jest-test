'use strict'

const errorHandler = {
    handle: async (err, req, res, next) => {
        if (!err) {
            return next()
        }
        return res.default(err.message, err.stack, err.status, true)
    }
}

module.exports = errorHandler