var express = require("express");
var router = express.Router();
const getAdvertisements = require ('../applications/getAdvertisements');


/* GET home page. */
router.get("/", async function (req, res, next) {
  
  try {
    

    const advertisements = await getAdvertisements(req.query)
    res.locals.advertisements = advertisements
    res.render("index");
  } catch (err) {
    next(err);
  }
  
});

module.exports = router;
