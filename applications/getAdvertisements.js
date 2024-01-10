const Advertisements = require('../models/Advertisements');

const rangePrice = function(range) {
    if (!range.includes('-')) {return range}
    const [gte, lte] = range.split('-');

    const filter = {};
    if (lte) {
        filter.$lte = lte;
    }
    if (gte) {
        filter.$gte = gte;
    }
    return filter
}

const tagFilter = function (tags) {
    const tagArr = tags.split(',');
    return {$in: tagArr}
}

const getAdvertisements = function (params) {
    
        const filterByName = params.name;
        const filterByType = params.type;
        const price = params.price;
        const tags = params.tags
        //paginacion
        const skip = params.skip;
        const limit = params.limit;

        //ordenacion
        const sort = params.sort;

        //field seleccion
        const fields = params.fields;
        
        const filtro = {};
        if (filterByName) {
            filtro.name = new RegExp('^' + filterByName, "i"); 
        }

        if (filterByType === 'false') {
            filtro.type = 'sell';
        } else if (filterByType == 'true') {
            filtro.type = 'buy';
        }

        //filtrar precio por rango
        if (price) {
            filtro.price = rangePrice(price);
        }

        if (tags) {
            filtro.tags = tagFilter(tags);
        }

    
        return Advertisements.lista(filtro, skip, limit, sort, fields);


}

module.exports = getAdvertisements;