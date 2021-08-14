require('dotenv').config();
require('./src/utils/logger');
const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const indexRoutes = require('./src/routes/index');
const productosRoutes = require('./src/routes/productos');
const carritoRoutes = require('./src/routes/carrito');
const passport = require('passport');
const session = require('express-session');
const clusterConfig = process.env.MODO_CLUSTER != 'NONE' ? process.env.MODO_CLUSTER : '' ;
const info = require('log4js').getLogger();

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



if(clusterConfig == 'CLUSTER'){
    console.log('Modo cluster');
    console.log('Iniciando servidor en modo CLUSTER');
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
        })
    } else {
        // Workers can share any TCP connection. In this case, it is an HTTP server.
        http.createServer((req, res) => {
            res.writeHead(200);
            res.end(`Current process\n ${process.pid}`);
            process.kill(process.pid);
        }).listen(port);
    }
}else{
    app.listen(port, () => {
        info.info(`Servidor corriendo en ` + port);
    });
}