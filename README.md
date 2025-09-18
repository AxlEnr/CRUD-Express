<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f8f8f8; color: #333; padding: 2rem;">
  <h1 style="color: #1f6feb;">🔧 CRUD con Express y Prisma</h1>

  <p>Este proyecto es un ejemplo básico de una API RESTful utilizando <strong>Express.js</strong> y <strong>Prisma ORM</strong> para manejar operaciones CRUD sobre una base de datos.</p>

  <p>📦 Repositorio: <a href="https://github.com/AxlEnr/CRUD-Express" target="_blank">github.com/AxlEnr/CRUD-Express</a></p>

  <h2>📁 Estructura del proyecto</h2>
  <pre style="background-color: #eee; padding: 1em; border-radius: 5px;">
/CRUD-Express
│
├── node_modules/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── ...
  </pre>

  <h2>🧰 Tecnologías utilizadas</h2>
  <ul>
    <li><a href="https://expressjs.com/" target="_blank">Express.js</a> - Framework web de Node.js</li>
    <li><a href="https://www.prisma.io/" target="_blank">Prisma ORM</a> - Mapeo Objeto-Relacional para bases de datos SQL</li>
    <li><a href="https://nodejs.org/" target="_blank">Node.js</a></li>
  </ul>

  <h2>⚙️ Pasos para crear el proyecto</h2>
  <ol>
    <li>Inicializar el proyecto:
      <pre><code>npm init -y</code></pre>
    </li>
    <li>Instalar dependencias:
      <pre><code>npm install express prisma @prisma/client dotenv</code></pre>
    </li>
    <li>Inicializar Prisma:
      <pre><code>npx prisma init</code></pre>
    </li>
    <li>Definir el modelo en <code>prisma/schema.prisma</code> y ejecutar:
      <pre><code>npx prisma migrate dev --name init</code></pre>
    </li>
  </ol>

  <h2>🚀 Cómo ejecutar</h2>
  <p>1. Clona el repositorio:</p>
  <pre><code>git clone https://github.com/AxlEnr/CRUD-Express.git</code></pre>

  <p>2. Instala las dependencias:</p>
  <pre><code>npm install</code></pre>

  <p>3. Crea el archivo <code>.env</code> con tu cadena de conexión:</p>
  <pre><code>DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tu_base_de_datos"</code></pre>

  <p>4. Ejecuta las migraciones:</p>
  <pre><code>npx prisma migrate dev</code></pre>

  <p>5. Inicia el servidor:</p>
  <pre><code>npm start</code></pre>

  <p>La API estará disponible en: <code>http://localhost:3000</code></p>

  <h2>📌 Rutas comunes</h2>
  <ul>
    <li><code>GET /usuarios</code> – Obtener todos los usuarios</li>
    <li><code>POST /usuarios</code> – Crear un nuevo usuario</li>
    <li><code>PUT /usuarios/:id</code> – Actualizar un usuario</li>
    <li><code>DELETE /usuarios/:id</code> – Eliminar un usuario</li>
  </ul>

  <h2>📄 Notas</h2>
  <ul>
    <li>Asegúrate de tener una base de datos local configurada antes de correr Prisma.</li>
    <li>Puedes usar <code>nodemon</code> para desarrollo:
      <pre><code>npm install --save-dev nodemon</code></pre>
      Y luego en <code>package.json</code>:
      <pre><code>
"scripts": {
  "dev": "nodemon src/index.js"
}
      </code></pre>
    </li>
  </ul>

  <h2>✏️ Autores</h2>
  <p>Desarrollado por: 
    <strong>Axel Enriquez García Vázquez</strong></p>
    <strong>Arturo Martinez Delgado</strong></p>
    <strong>Erick Adier Ortiz Cabrera</strong></p>
    <strong>Mariluz Gayoso Vargas</strong></p>

</body>
</html>
