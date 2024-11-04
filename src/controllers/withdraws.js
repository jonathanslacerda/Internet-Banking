const { date } = require('joi');
const knex = require('../connection');
const { format } = require('date-fns')
const bcrypt = require('bcrypt');

const withdraw = async (req, res) => {
    const { client_id, amount, passcode } = req.body;

    const withdrawDate = format(new Date(), "yyyy-LLLL-dd HH:mm")

    try {

        const user = await knex('client').where({ id: client_id }).first();

        if (!user) {
            return res.status(404).json({ message: 'Client not found' })
        }

        const passcodeValidation = await bcrypt.compare(passcode, user.passcode);

        if (!passcodeValidation) {
            return res.status(400).json({ mensagem: "Passcode invalid" });
        };

        if (user.fund < amount) {
            return res.status(403).json({ message: 'Insuficient funds' })
        }

        await knex('withdraws').insert({ client_id, transaction_date: withdrawDate, amount })

        user.fund -= amount
    
        await knex('client').update(user).where({ id: client_id })

        return res.status(201).json({ message: 'withdraw efetued'})

    } catch (error) {

        return res.status(500).json({ message: 'Internal error' })

    }


}

module.exports = withdraw;