var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const authentication = require("./lib/authentication");
const swaggerMiddleware = require("./lib/swaggerMiddleware");
const i18n = require("./lib/i18nConfigure");

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

/**
 * rutas del Api
 */
app.use(
  "/api/advertisements",
  authentication,
  require("./routes/api/advertisements")
);
app.use("/api-doc", authentication, swaggerMiddleware);

/**
 * rutas del website
 */

app.use(i18n.init);
app.use("/", require("./routes/index"));
app.use("/features", require("./routes/features"));
app.use ('/change-locale', require('./routes/change-locale'))

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
