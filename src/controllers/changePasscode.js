const knex = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const changePasscode = async (req, res) => {
    const { email, old_passcode, new_passcode } = req.body;

    try {
        const user = await knex('client').where({ email }).first();

        if (!user) {
            return res.status(403).json({ message: 'email or password invalid'})
        };

        const passcodeValidation = await bcrypt.compare(old_passcode, user.passcode);

        if (!passcodeValidation) {
            return res.status(400).json({ mensagem: "email or password invalid" });
        };

        if (old_passcode === new_passcode) {
            return res.status(400).json({ mensagem: "New password must be diferent from the old password" });
        }

        const cryptedPassword = await bcrypt.hash(new_passcode, 10);
        user.passcode = cryptedPassword

        await knex('client').update(user).where({ email })

        return res.status(201).json({ message: 'User updated'})

    } catch (error) {
        return res.status(500).json({ mensagem: 'Internal error' })
    }
};

module.exports = changePasscode;