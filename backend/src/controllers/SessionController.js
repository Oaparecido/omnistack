//index, show, store, update, destroy

// index   -> criar um metodo que retorna uma listagem de sessions;
// show    -> listar uma unica session;
// store   -> criar uma session;
// update  -> atualizar uma session;
// destroy -> remover/deletar uma session;


const User = require('../models/User')

module.exports = { 
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) { 
            user = await User.create({ email })
        }

        return res.json(user);
    }
}