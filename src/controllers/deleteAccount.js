const knex = require('../connection');


const deleteAccount = async (req, res) => {
    const { id } = req.params

    try {
        const user = await knex('client').where({ id }).first();

        if (!user) { 
            return res.status(404).json({ message: 'User not found'})
        }

        await knex('client').where({ id }).delete();

        return res.status(200).json({ message: 'User deleted'})
    } catch (error) {
        return res.status(500).json({ message: 'Internal error' })
    }
};

module.exports = deleteAccount;