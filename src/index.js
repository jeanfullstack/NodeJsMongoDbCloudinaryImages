if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    console.log('Enviroment: ', process.env.NODE_ENV);
});

//Hora 1 Min 47

//Comando para correr el servidor: npm run dev (node src/index.js)
 
//Comando para correr la base de datos: mongod

//Instalar dos dependencias anexas:
//npm install @handlebars/allow-prototype-access
//npm install handlebars@4.5.3