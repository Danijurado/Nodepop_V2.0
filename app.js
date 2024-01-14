var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const MongoStore = require('connect-mongo');
const session = require('express-session');
const multer  = require('multer')


const authentication = require("./lib/authentication");
const swaggerMiddleware = require("./lib/swaggerMiddleware");
const sessionAuthMiddleware = require("./lib/sessionAuthMiddleware");
const jwtMiddleware = require('./lib/jwtMiddleware');
const i18n = require("./lib/i18nConfigure");

const ChangeLocaleController = require('./controllers/ChangeLocaleController');
const LoginController = require('./controllers/LoginController');
const PrivadoController = require('./controllers/PrivadoController');
const AdvertisementsController = require('./controllers/AdvertisementsController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage});


require("./lib/connectMongoose");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.title = "Nodepop";

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const loginController = new LoginController();

/**
 * rutas del Api
 */
app.use("/api-doc", swaggerMiddleware);
app.post('/api/login', loginController.postJWT);
app.use("/api/advertisements", jwtMiddleware, require("./routes/api/advertisements"));

/**
 * rutas del website
 */

const changeLocaleController = new ChangeLocaleController();
const privadoController = new PrivadoController();
const advertisementsController = new AdvertisementsController();

app.use(i18n.init);
app.use(session({
  name: 'nodepop-session',
  secret: 'sakfksdnkjsD',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3 //3 dias
  },
  store: MongoStore.create({mongoUrl: process.env.MONGO_URL}) 
}));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use("/", require("./routes/index"));
//app.use("/features", require("./routes/features"));

//app.use ('/change-locale', require('./routes/change-locale'));
app.get('/change-locale/:locale', changeLocaleController.changeLocale);
//app.use('/login', require('./routes/login'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/privado', sessionAuthMiddleware, privadoController.index);
app.get('/advertisements-new', sessionAuthMiddleware, advertisementsController.new);
app.post('/advertisements-new', sessionAuthMiddleware, upload.single('image'), advertisementsController.postNewAd);
app.get('/advertisements-delete/:advertisementId', sessionAuthMiddleware, advertisementsController.deleteAd)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.array) {
    const errorInfo = err.errors[0];
    console.log(errorInfo);
    err.massage = `Error en ${errorInfo}, parametro ${errorInfo.path} ${errorInfo.msg}`;
    err.status = 422;
  }
  res.status(err.status || 500);

  //falla una peticion al Api
  //responder el error con formato JSON
  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

module.exports = app;
