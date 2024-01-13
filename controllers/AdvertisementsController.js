var createError = require("http-errors");
const Advertisements = require('../models/Advertisements');

class AdvertisementsController {
    new(req, res, next) {
        res.render('advertisements-new');
    }

    async postNewAd(req, res, next) {
        try {
           
           const {name, type, image, tags} = req.body;

           const advertisement = new Advertisements({
            name,
            type,
            image,
            tags
           });
           await advertisement.save();
           res.redirect('/privado');

        } catch (error) {
          next(error);  
        }
    }

    
    async deleteAd(req, res, next) {
        try {
            //const usuarioId = req.session.usuarioLogado;
            const advertisementId = req.params.advertisementId;
            console.log(advertisementId)
            
            const advertisement = await Advertisements.findOne({_id: advertisementId});

            if (!advertisement) {
                next(createError(404, 'not found'))
                return;
            }

            await Advertisements.deleteOne({_id: advertisementId});

            res.redirect('/privado');
        
        } catch (error) {
           next(error); 
        }
    }
    
}


module.exports = AdvertisementsController;