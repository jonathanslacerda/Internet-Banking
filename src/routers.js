// Connections and Requirements
const express = require('express');
const routers = express();
const bodyRequestValidation = require('./middlewares/bodyRequestValidations');
const paramsRequestValidation = require('./middlewares/paramsRequestValidations');
const tokenJWTValidation = require('./middlewares/tokenJWTValidation');

// Validations Schemas
const createAccountSchema = require('./validations/createAccountSchema')
const loginSchema = require('./validations/loginSchema')
const changePasscodeSchema = require('./validations/changePasscodeSchema')
const idParamsSchema = require('./validations/idParamsSchema');


// Controllers Import
const createAccount = require('./controllers/createAccount');
const loginAccount = require('./controllers/loginAccount');
const detailProfile = require('./controllers/detailProfile');
const changePasscode = require('./controllers/changePasscode');
const deleteAccount = require('./controllers/deleteAccount');


// User routers
routers.post('/account', bodyRequestValidation(createAccountSchema), createAccount)
routers.post('/login', bodyRequestValidation(loginSchema), loginAccount)

routers.use(tokenJWTValidation);

routers.get('/account/:id', paramsRequestValidation(idParamsSchema), detailProfile)
routers.patch('/account', bodyRequestValidation(changePasscodeSchema), changePasscode)
routers.delete('/account/:id', paramsRequestValidation(idParamsSchema), deleteAccount)

// Transaction Routers



module.exports = routers;

