Proyecto Express
=======================

Este es un proyecto básico creado con Express.js, un framework minimalista para Node.js, utilizado para construir aplicaciones web y APIs.

📁 Estructura del proyecto:
---------------------------
/mi-proyecto-express
│
├── node_modules/
├── src/
│   └── index.js
├── .gitignore
├── package.json
└── README.md

🛠️ Requisitos:
--------------
- Node.js instalado en tu sistema: https://nodejs.org/
- npm (viene con Node.js) o yarn.

⚙️ Proceso de creación:
-----------------------

1. Inicializar el proyecto:
   npm init -y

2. Instalar Express:
   npm install express

3. Crear el archivo src/index.js con este contenido:

   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 3000;

   app.get('/', (req, res) => {
     res.send('¡Hola, mundo!');
   });

   app.listen(PORT, () => {
     console.log(`Servidor escuchando en http://localhost:${PORT}`);
   });

4. Agregar el script de inicio en package.json:

   "scripts": {
     "start": "node src/index.js"
   }

🚀 Ejecución:
-------------
1. Para iniciar el servidor:
   npm start

2. Visita en tu navegador:
   http://localhost:3000

🧾 Notas:
---------
- Para desarrollo con recarga automática, instala nodemon:
  npm install --save-dev nodemon

  Luego en package.json:

  "scripts": {
    "dev": "nodemon src/index.js"
  }
