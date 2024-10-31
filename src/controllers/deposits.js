const { date } = require('joi');
const knex = require('../connection');
const { format } = require('date-fns')

const newDeposit = async (req, res) => {
    const { client_id, amount } = req.body;

    const depositDate = format(new Date(), "yyyy-LLLL-dd HH:mm")

    try {

        const user = await knex('client').where({ id: client_id }).returning().first()

        if (!user) {
            return res.status(404).json({ message: 'Client not found' })
        }

        await knex('deposits').insert({ client_id: client_id, transaction_date: depositDate, amount })

        user.fund += amount

        await knex('client').update(user).where({ id: client_id })

        return res.status(201).json({ message: 'Deposit efetued'})

    } catch (error) {

        console.log(error)

        return res.status(500).json({ message: 'Internal error' })

    }


}

module.exports = newDeposit;