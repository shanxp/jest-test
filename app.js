
const express = require('express'), 
app = express(), 
bodyParser = require('body-parser'),
router = require('./config/router'),
errorHandler = require('./config/errorHandler') ;
// app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler.handle);

express.response.default = function (message, data, status, error, token, reqId) {
    let statusCode = status || 200
    let err = error || false
    let dataArr = []
    if (data) {
        if (!Array.isArray(data)) {
            dataArr.push(data)
        } else {
            dataArr = [...data]
        }
    }
    this.status(statusCode)
    this.json({
        error: err,
        message: message || '',
        data: dataArr,
        token: this.req.token || token, //for login only
        requestId: reqId || this.req.requestId,
        // requestIP: this.req.connection.remoteAddress
    })
}

module.exports = app ;