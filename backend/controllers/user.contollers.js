const User = require('../models/user');

const userCTRL = {};

userCTRL.postUser = async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({
            ok:false,
            mensaje: 'Este usuario ya existe'
        });
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.password = await user.encriptPassword(user.password); 
    const result = await user.save();
    const jwtToken = user.generateKJWT();
    res.status(200).json({
        ok: true,
        token: jwtToken
    });

};

userCTRL.login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(!user) {
        return res.status(404).json({
            ok: false,
            mensaje: 'Usuario no existente'
        });
    };

    const validPassword = await user.validatePassword(password);
    if(!validPassword) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Password incorrecto'
        });
    }

    const token = user.generateKJWT();
    
    res.status(200).json({
        ok:true,
        token: token
    })
};

userCTRL.profile = async (req, res) => {

    const user = await User.findById(req.userId);

   if(!user) {
       return res.status(404).json({
           ok: false,
           mensaje: 'Usuario no encontrado'
       });
   }

   res.json(user);
};

module.exports = userCTRL;
