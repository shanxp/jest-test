'use strict'

const request = require('supertest');
const app = require('../app'); 

jest.mock('../config/auth');
const _auth = require('../config/auth');
// _auth.mockReset().mockImplementation((req, res, next) => {
//     const err = new Error('Some error');
//     err.status = 401 ;
//     return next(err);
// });

describe(`test User Controller`, () => {

    test(`it should return 401 without token`, () => {
        _auth.mockReset().mockImplementationOnce((req, res, next) => {
            const err = new Error('Some error');
            err.status = 401 ;
            return next(err);
        });
        return request(app).get('/secure')
            // .send()
            .expect(401);
    });

    test(`it should return 200 with token`, () => {

        _auth.mockReset().mockImplementationOnce((req, res, next) => {
            return next();
        });

        return request(app).get('/secure')
            // .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJUb20gQ2F0IiwiaWQiOjEwOTgxfSwiaWF0IjoxNTQxMDYzOTE5LCJleHAiOjE1NDEwNjc1MTl9.JqioZ6JMZfo119YrWgeQ11sBQby7ysdNymHz1CY5yqM')
            .expect(200);
    });

});