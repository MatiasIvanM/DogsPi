const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


const {getDogs} = require ('../Controller/getDogs')
const {getIdRaza} = require('../Controller/IdRaza')
const searchDogByName = require('../Controller/SearchByRaceName')
const getTemperaments = require('../Controller/getTemperament')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs', getDogs);
router.use('/temperaments', getTemperaments)
router.use('/dog/:id', getIdRaza);
router.use('/dog/name?=', searchDogByName);




module.exports = router;