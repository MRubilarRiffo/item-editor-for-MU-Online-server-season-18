const server = require('./src/server');
const { conn } = require('./src/db');
const { QueryTypes } = require('sequelize');

const PORT = 3001;

conn.sync({ force: false })
    .then(async () => {
        try {
            // Intenta autenticar la conexión
            await conn.authenticate();

            console.log('Conexión con base de datos exitosa');
        } catch (error) {
            console.error('Error de conexión:', error.message);
        };
    })
    .then(() => {
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(error => console.log(error));