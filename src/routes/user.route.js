const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const moment = require('moment');
const userController = require('../controllers/user.controller');
const {handleErrorAsync} = require("../utils/hof"); 

router.post('/signup',handleErrorAsync,(req, res)=>{
    console.log(req.body);
    let {
        passportID,
        username,
        email,
        password,
        name,
        description,
        image,
        createdAt,
        dateOfBirth
    } = req.body;
    if (passportID&&
        username&&
        email&&
        password&&
        name&&
        description&&
        image&&
        createdAt&&
        dateOfBirth) {
        // let hash = bcryptjs.hashSync(password, 8);
        req.body.password = bcryptjs.hashSync(password, 8);
        req.body.createdAt = moment().format('DD/MM/YYYY');

        let doc = await userController.create(req.body)
        console.log(doc);
        if (doc && !doc.error) {
            res.status(201).send(doc)
        } else {
            res.status(400).send(doc)
        }
        return;
    }

    res.status(400).send({
        error: "faltan datos"
    })
})
router.post('/login',handleErrorAsync,(req, res)=>{
    console.log("Login");
    console.log(req.body.password);
    //buscar alumno con ese correo
    let user = await userController.getUser(req.body.email)
    if (user) {
        
        //comparar el password con el hash de la base de datos
        if (bcryptjs.compareSync(req.body.password, user.password)) {
            //generación del token
            let token = jwt.sign({
                correo: user.correo
            }, 'Jeopardy', {
                expiresIn: 60 * 180
            })
            res.send({
                token: token
            })
        } else {
            res.status(401).send({
                error: "password incorrecto"
            })
        }
    } else {
        res.status(404).send({
            error: "No existe ese alumno"
        })
    }
})
router.get('/logout',handleErrorAsync,(req, res)=>{})
router.get('/', (req, res)=>{
    res.send({user: userController.list()});
})
router.get('/:id',handleErrorAsync,(req, res)=>{
    const {id} = req.params;
    const user = await userController.getById(id)
    res.send(user)

})
router.put('/:id',handleErrorAsync,(req, res)=>{
    const {id} = req.params;
    const user = await userController.update(id, req.body)
    res.send(user)

})
router.delete('/:id',handleErrorAsync,(req, res)=>{
    const {id} = req.params;
    await userController.delete(id);
    res.status(204).send();
})

module.exports = router;