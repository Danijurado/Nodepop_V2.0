var createError = require("http-errors");
const Advertisements = require('../models/Advertisements');

const cote = require('cote');
const timeService = new cote.Responder({ name: 'Time Service' });
const jimp = require('jimp');

timeService.on('resize', (req) => {
    const fn = async () => {
        const image = await jimp.read(req.image.path);
        // Resize the image to width 150 and auto height.
        await image.resize(150, jimp.AUTO);
    
        // Save and overwrite the image
        await image.writeAsync(`public/thumbnails/${req.image.originalname}`);
    }

    fn();
});


const client = new cote.Requester({ name: 'Client' });


class AdvertisementsController {
    new(req, res, next) {
        res.render('advertisements-new');
    }

    async postNewAd(req, res, next) {
        try {
           
           const {name, type,  tags} = req.body;
           const image = req.file;
           const advertisement = new Advertisements({
            name,
            type,
            image: req.file.originalname,
            tags
           });

           client.send({ type: 'resize', image });
        
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