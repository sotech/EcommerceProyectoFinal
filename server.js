const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const log4js = require("log4js");
const indexRoutes = require('./src/routes/index');
const productosRoutes = require('./src/routes/productos');
const carritoRoutes = require('./src/routes/carrito');
const passport = require('passport');
const session = require('express-session');
const User = require('./src/models/userModel');
require('dotenv').config();
require('./src/utils/mongoConnection');
require('./src/passport/local-auth');
const port = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'src/views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(session({
    secret: 'sotechEcommerce',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    next();
})
app.use(morgan('dev'));
app.use('/', indexRoutes);
app.use('/productos', productosRoutes);
app.use('/carrito', carritoRoutes);

//Log4js
log4js.configure({
    appenders: {
        loggerConsola: { type: 'console' },
        loggerWarn: { type: 'file', filename: 'logs/warn.log' },
        loggerError: { type: 'file', filename: 'logs/error.log' },
    },
    categories: {
        default: { appenders: ["loggerConsola"], level: 'info' },
        warnings: { appenders: ["loggerWarn"], level: 'warn' },
        errors: { appenders: ["loggerError"], level: 'error' },
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});