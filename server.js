const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs');


app.set("PORT", process.env.PORT || 3000);


app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);


// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// Middlewares
//app.use(express.urlencoded({extended: false}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use(require('./routes/index'))


module.exports = app




// Leer archivos JSON
const departments = JSON.parse(fs.readFileSync(path.join(__dirname, 'departments.json')));
const towns = JSON.parse(fs.readFileSync(path.join(__dirname, 'towns.json')));

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
    res.render('index', { departments, towns });
});

// Ruta para procesar el formulario
app.post('/add', (req, res) => {
    const { department, town } = req.body;
    // Aquí puedes procesar el objeto registrado
    res.send(`Departamento: ${department}, Municipio: ${town}`);
});

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');



