const knex = require('../connection');
const bcrypt = require('bcrypt');

const createAccount = async (req, res) => {
    const { fullname, email, register, passcode } = req.body;

    let fund = 0;

    try {
        const cryptedPassword = await bcrypt.hash(passcode, 10);

        const newUser = await knex('client')
        .insert({fullname, email, register, passcode: cryptedPassword, fund})
        .returning(['fullname', 'email', 'fund']);

        return res.status(201).json(newUser);

    } catch (error) {
        if (error.code === '23505') {
            return res.status(500).json({ mensagem: 'email already exists' })
        }
        
        return res.status(500).json({ mensagem: 'Internal error' })
    }
};

module.exports = createAccount;