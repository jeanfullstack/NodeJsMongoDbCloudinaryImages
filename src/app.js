const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');

// allowInsecurePrototypeAccess, Handlebars
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

//Instalar dos dependencias anexas:
//npm install @handlebars/allow-prototype-access
//npm install handlebars@4.5.3

//Initializations
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));

//Routes
app.use(require('./routes'));

module.exports = app;



//@handlebars/allow-prototype-access
//app.engine('handlebars', exphbs({
//    handlebars: allowInsecurePrototypeAccess(Handlebars)
//}));
//app.set('view engine', 'handlebars');

//Comando para correr el servidor: npm run dev (node src/index.js)
 
//Comando para correr la base de datos: mongod