const List = require('../models/list');
const User = require('../models/user');
const Task = require('../models/task');
const listCTRL = {};

listCTRL.getlists = async (req, res) => {
    const userId = await User.findById(req.userId);
    if(!userId) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Usuario no existente'
        });
    };

    const listas = await List.find({
        "userId":userId._id
    });
    res.json(listas);  
};

listCTRL.createlist = async (req, res) => {
    const userId = await User.findById(req.userId);
    if(!userId) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Usuario no existente'
        });
    };

    let list = new List({
        userId: userId._id,
        title: req.body.title
    });

    await list.save();
    res.status(200).json({
        ok:true,
        mensaje: 'Lista Creada'
    });
};

listCTRL.updateList = async (req, res) => {
    const userId = await User.findById(req.userId);
    if(!userId) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Usuario no existente'
        });
    };

    List.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(() => {
        res.status(200).json({
            ok:true,
            mensaje: 'Lista actualizada'
        });
    });
};

listCTRL.deleteList = async (req, res) => {
    const userId = await User.findById(req.userId);
    if(!userId) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Usuario no existente'
        });
    };

    await List.findOneAndRemove({_id: req.params.id});
    await Task.deleteMany({_listId: req.params.id})
    res.status(200).json({
        ok: true,
        mensaje:'Lista Borrada'
    });
};

module.exports = listCTRL;