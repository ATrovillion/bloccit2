const Ad = require("./models").Ad;

module.exports = {

    getAllAds(callback){
        return Ad.all()

        .then((ads) => {
            callback(null, ads);
        })
        .catch((err) => {
            callback(err);
        })
    }
}