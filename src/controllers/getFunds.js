const knex = require('../connection');
const bcrypt = require('bcrypt');


const getFunds = async (req, res) => {
    const { id, passcode } = req.params

    try {
        
        const user = await knex('client').where({ id }).first();

        if (!user) {
            return res.status(404).json({ message: 'Client not found' })
        }

        const passcodeValidation = await bcrypt.compare(passcode, user.passcode);

        if (!passcodeValidation) {
            return res.status(400).json({ mensagem: "Passcode invalid" });
        };

        return res.status(200).json(`Fund: ${user.fund}`)

    } catch (error) {
        
        return res.status(500).json({ message: 'Internal error' })

    }
}




module.exports = getFunds