
const jwtLib = require('jsonwebtoken');
const jwtSecret = process.env.NODE_JWT_SECRET || 'SeCreT';
const jwtExpirationTime = parseInt(process.env.NODE_JWT_EXPIRATION_TIME) || 3600;

module.exports = {
    home: (req, res) => {
        res.send('Home called ');
    },
    secure: (req, res) => {
        res.send('Auth called ');
    },
    token: (req, res) => {
        let user = {
            "name": "Tom Cat",
            "id": 10981
        }
        token = jwtLib.sign( {user:user}, jwtSecret, { expiresIn: jwtExpirationTime });
        res.send(token);
    },
    login: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        res.send({ message: 'Login called ' + username + ' ' + password });
    },
    logout: (req, res) => {
        res.send('Logout called');
    },
    error: (req, res) => {
        res.send('Error called');
    }
}