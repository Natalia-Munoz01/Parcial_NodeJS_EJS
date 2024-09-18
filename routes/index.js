const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Cargar departamentos y municipios desde archivos JSON
const departmentsPath = path.join(__dirname, '../departments.json');
const townsPath = path.join(__dirname, '../towns.json');
const departmentsData = JSON.parse(fs.readFileSync(departmentsPath, 'utf-8'));
const townsData = JSON.parse(fs.readFileSync(townsPath, 'utf-8'));

// Array para almacenar los objetos agregados
let objectsList = [];

// Página principal
router.get('/', (req, res) => {
    res.render('index', { departments: departmentsData, towns: townsData, objects: objectsList });
});

// Manejar el envío del formulario
router.post('/add-object', (req, res) => {
    const newObject = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        departamento: req.body.departamento,
        municipio: req.body.municipio
    };
    
    objectsList.push(newObject);
    res.redirect('/');
});

module.exports = router;
