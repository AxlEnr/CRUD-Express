const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Importar ruta creadas //EJEMPLOS
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users.routes');
const productosRouter = require('./src/routes/productos.routes');


const app = express();

// Middleware base
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Servir archivos estáticos (IMAGENES, DOCS, ETC)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/productos', productosRouter);


// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

module.exports = app;
