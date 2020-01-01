const Task = require('../models/task');
const User = require('../models/user');
const taskCTRL = {};

taskCTRL.gestTasks = async (req, res) => {
    
    const tasks = await Task.find({
        _listId: req.params.listId
    });
    res.send(tasks);
};

taskCTRL.postTask = async (req, res) => {
        
    let task = new Task({
        _listId: req.params.listId,
        name: req.body.name,
        description: req.body.description,
        status: 'to-do',
        imageUrl: 'imgurl'
    });

    await task.save();
    res.status(200).json({
        ok:true,
        mensaje: 'Tarea Creada'
    });
    
};

taskCTRL.putTask = async (req, res) => {
   
     let task = await Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    })

    if(!task) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay tarea'
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: 'Tarea actualizada'
    });
};

taskCTRL.deleteTask = async (req, res) => {
    
    let task = await Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    });

    if(!task) {
        return res.status(404).json({
            ok: false,
            mensaje: "Tarea no existente"
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: "Tarea borrada"
    });
};

taskCTRL.upload = async (req, res) => {
    const url = req.protocol + '://' + req.get('host') +'/backend';
    
    let imageUrl = null;

    if(req.file.filename) {
        imageUrl = url + '/public/' + req.file.filename;
    }

    else {
        imageUrl = null;
    }

    let task = new Task ({
        _listId: req.params.listId,
        name: req.body.name,
        description: req.body.description,
        status: 'to-do',
        imageUrl: imageUrl
    });

    await task.save();
    res.status(200).json({
        ok:true,
        mensaje: 'Tarea Creada',
        tarea: task
    });
}



module.exports = taskCTRL;