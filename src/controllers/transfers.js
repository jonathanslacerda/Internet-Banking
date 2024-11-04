const { date } = require('joi');
const knex = require('../connection');
const { format } = require('date-fns')
const bcrypt = require('bcrypt');

const transfers = async (req, res) => {
    const { origin_account, destiny_account, amount, passcode } = req.body

    const transferDate = format(new Date(), "yyyy-LLLL-dd HH:mm")

    try {

        const originUser = await knex('client').where({ id: origin_account }).first();

        const destinyUser = await knex('client').where({ id: destiny_account }).first();

        if (!originUser || !destinyUser) {
            return res.status(404).json({ message: 'Client not found' })
        }

        const passcodeValidation = await bcrypt.compare(passcode, originUser.passcode);

        if (!passcodeValidation) {
            return res.status(400).json({ mensagem: "Passcode invalid" });
        };

        if (originUser.fund < amount) {
            return res.status(403).json({ message: 'Insuficient funds' })
        }

        await knex('transfers').insert({ 
            client_id_origin: origin_account, 
            client_id_destiny: destiny_account, 
            transaction_date: transferDate,
            amount })

        originUser.fund -= amount;
        destinyUser.fund += amount;

        await knex('client').update(originUser).where({ id: origin_account })

        await knex('client').update(destinyUser).where({ id: destiny_account })

        return res.status(201).json({ message: 'Transfer complete'})
        
    } catch (error) {

        console.log(error)

        return res.status(500).json({ message: "Internal error"})

    }


};

module.exports = transfers