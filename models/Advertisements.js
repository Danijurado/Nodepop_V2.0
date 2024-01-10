const mongoose = require('mongoose');

//definir esquema advertisements
const advertisementsSchema = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    image: String,
    tags: [String]
});

advertisementsSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
    const query = Advertisements.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec();
}

//crear modelo advertisements
const Advertisements = mongoose.model('Advertisements', advertisementsSchema);

//exportar el modulo advertisements
module.exports = Advertisements;