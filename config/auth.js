const jwtLib = require('jsonwebtoken');
const jwtSecret = process.env.NODE_JWT_SECRET || 'SeCreT';
const jwtExpirationTime = parseInt(process.env.NODE_JWT_EXPIRATION_TIME) || 1800;

module.exports = (req, res, next) => {
    const error = new Error();
    error.status = 401 ;

    let token = null;
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            error.message = '1.error' ;
            return next(error);
        }
    }
    else {
        error.message = '2.error' ;
        return next(error);
    }

    jwtLib.verify(token, jwtSecret, (err, tokenDecoded) => {
        if (err) {
            error.message = err.message ;
            return next(error);
        }

        if (!tokenDecoded.user.name || !tokenDecoded.user.id) {
            error.message = '4.error' ;
            return next(error);
        }

        req.currentUser = tokenDecoded.user; // This is the decrypted token or the payload you provided
        res.currentUser = tokenDecoded.user; // This is the decrypted token or the payload you provided

        //Once authenticated create a new token
        try {
            let logMessage = {};
            logMessage.reqId = res.requestId;
            let user = {
                "name": tokenDecoded.user.name,
                "id": tokenDecoded.user.id
            }
            token = jwtLib.sign(user, jwtSecret, { expiresIn: jwtExpirationTime });
            res.token = token;

            next();
        }
        catch (exceptionError) {
            error.message = '6.error' ;
            return next(error);
        }
        
    });

};