const knex = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginAccount = async (req, res) => {
    const { email, passcode } = req.body;

    try {
        const user = await knex('client').where({ email }).first().returning('*');

        if (!user) {
            return res.status(404).json({ mensagem: "User email invalid" })
        };

        const passcodeValidation = await bcrypt.compare(passcode, user.passcode);

        if (!passcodeValidation) {
            return res.status(400).json({ mensagem: "Passcode invalid" });
        };

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' })

        return res.status(200).json({ id: user.id, fullname: user.fullname, email: user.email, token })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Internal error' })
    }
};

module.exports = loginAccount