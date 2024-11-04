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
const depositSchema = require('./validations/depositsSchema');
const withdrawSchema = require('./validations/withdrawSchema');
const transferSchema = require('./validations/transfersSchema');
const getFundsSchema = require('./validations/getFundsSchema.js');
const statementSchema = require('./validations/statementSchema.js');


// Controllers Import
const createAccount = require('./controllers/createAccount');
const loginAccount = require('./controllers/loginAccount');
const detailProfile = require('./controllers/detailProfile');
const changePasscode = require('./controllers/changePasscode');
const deleteAccount = require('./controllers/deleteAccount');
const newDeposits = require('./controllers/deposits');
const withdraw = require('./controllers/withdraws');
const transfers = require('./controllers/transfers');
const getFunds = require('./controllers/getFunds.js');
const statement = require('./controllers/statement.js');


// User routers
routers.post('/account', bodyRequestValidation(createAccountSchema), createAccount)
routers.post('/login', bodyRequestValidation(loginSchema), loginAccount)

routers.use(tokenJWTValidation);

routers.get('/account/:id', paramsRequestValidation(idParamsSchema), detailProfile)
routers.patch('/account', bodyRequestValidation(changePasscodeSchema), changePasscode)
routers.delete('/account/:id', paramsRequestValidation(idParamsSchema), deleteAccount)

// Transaction Routers

routers.post('/transactions/deposits', bodyRequestValidation(depositSchema), newDeposits)
routers.post('/transactions/withdraws', bodyRequestValidation(withdrawSchema), withdraw)
routers.post('/transactions/transfers',bodyRequestValidation(transferSchema), transfers)
routers.get('/transactions/fund/:id/:passcode',paramsRequestValidation(getFundsSchema), getFunds)
routers.get('transactions/statement/:id/:passcode',paramsRequestValidation(statementSchema), statement)


module.exports = routers;

