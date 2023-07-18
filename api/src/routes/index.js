const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


const {getDogs} = require ('../Controller/getDogs')
const getTemperaments = require('../Controller/getTemperament')
const {getIdRaza} = require('../Controller/IdRaza')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs', getDogs);
router.use('/temperaments', getTemperaments)
router.use('/dog/:id', getIdRaza);




module.exports = router;
