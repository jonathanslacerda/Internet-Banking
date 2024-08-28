const knex = require('../connection');

const detailProfile = async (req, res) => {
    const { id } = req.params;

    try {

        const client = await knex('client').where({ id }).first();

        if (!client) {
            return res.status(404).json({ message: 'Client not found'})
        }
        
        return res.status(200).json(client)

    } catch (error) {
        return res.status(500).json({ message: 'Internal error' })
    }
};

module.exports = detailProfile