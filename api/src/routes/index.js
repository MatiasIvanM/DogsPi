// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const router = Router();

const {getDogs} = require ('../Controller/getDogs')
const {getIdRaza} = require('../Controller/IdRaza')
const {createDog} = require('../Controller/postDogs')
const searchDogs = require('../Controller/SearchByRaceName')
const getTemperaments = require('../Controller/getTemperament')
// Configurar los routers

router.use('/dogs', getDogs);
router.use('/temperaments', getTemperaments)
router.use('/dog/:id', getIdRaza);
router.use('/raza/search', searchDogs);
router.post('/create',createDog);




module.exports = router;
