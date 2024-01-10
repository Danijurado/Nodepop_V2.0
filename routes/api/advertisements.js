const express = require('express');
const getAdvertisements = require('../../applications/getAdvertisements');
const router = express.Router();
const Advertisements = require('../../models/Advertisements');


//GET /api/advertisements
//devuelve lista de anuncios
/**
 * @openapi
 * /api/advertisements:
 *  get:
 *   description: Devuelve una lista de anuncios
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *       type: string
 *      description: Filtrar por nombre
 *    - in: query
 *      name: price
 *      schema:
 *       type: string
 *      description: Filtrar por precio
 *    - in: query
 *      name: type
 *      schema:
 *       type: string
 *      description: Filtrar por compra/venta
 *    - in: query
 *      name: tags
 *      schema:
 *       type: string
 *      description: Filtrar por tags
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.get('/', async (req, res, next) => {
    try {
       const advertisements = await getAdvertisements(req.query);

        res.json({results: advertisements})

    } catch (err) {
        next(err);
    }
});

//GET /api/advertisements/(_id)
//devuelve un anuncio
/**
 * @openapi
 * /api/advertisements/(_id):
 *  get:
 *   description: Devuelve un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const advertisements = await Advertisements.findById(id);
        res.json({result: advertisements});
    } catch (err) {
      next(err);  
    }
});

//PUT /api/advertisements/(_id)
//actualiza un anuncio
/**
 * @openapi
 * /api/advertisements/(_id):
 *  put:
 *   description: Actualiza un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body; 

      const updateAdvertisements = await Advertisements.findByIdAndUpdate(id, data, {new: true});
      res.json({updateAdvertisements});

    } catch (err) {
      next(err);  
    }
});

//POST /api/advertisements
//crear un anuncio
/**
 * @openapi
 * /api/advertisements/:
 *  post:
 *   description: Crea un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.post('/', async (req, res, next) => {
    try {
      const advertisementsData = req.body;

      //crear anuncio nuevo
      const advertisements = new Advertisements(advertisementsData);

      //guardar en BD
      const advertisementsSave = await advertisements.save();

      res.json({result: advertisementsSave});
    } catch (err) {
      next(err);  
    }
});

//DELETE /api/advertisements/(_id)
//elimina un anuncio
/**
 * @openapi
 * /api/advertisements/(_id):
 *  delete:
 *   description: actualiza un anuncio
 *   responses:
 *    200:
 *     description: Devuelve JSON
 */
router.delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      
      await Advertisements.deleteOne({_id: id});

      res.json();
    } catch (err) {
      next(err)  
    }
})

module.exports = router;
