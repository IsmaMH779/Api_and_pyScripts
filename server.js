const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

const router = require('./routes/routes');
app.use('/api', router);


//python script execute
//Multer config
const storage = multer.diskStorage({
    destination: './uploads/crop-image',
    filename: (req, file, cb) => {
        //Generate unique name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});
const upload = multer({ storage });

//upload route
app.post('/upload/crop-image', upload.single('file'), (req, res) => {
    //get name of uploaded file
    const fileName = req.file.filename;
    console.log('Nombre del archivo:', fileName);
    res.send('Archivo subido correctamente.');
});

// get upload files route
app.get('/api/files', (req, res) => {
    // Agregar el encabezado Access-Control-Allow-Origin a la respuesta
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (error, files) => {
        if (error) {
            console.error('Error al leer el directorio:', error);
            res.status(500).json({ error: 'Error al leer el directorio' });
        } else {
            res.json(files);
        }
    });
});

//open python script route
app.get('/open-file/:filename', (req, res) => {
    const { filename } = req.params;

    // crop disease script route
    const pythonScriptPath = path.join(__dirname, 'src/py/crop_disease_script.py');

    // ejecute python script
    const pythonScript = spawn('python', [pythonScriptPath, filename]);
    console.log(pythonScript);
    // Manejar la salida del script de Python
    pythonScript.stdout.on('data', (data) => {
        console.log(`Salida del script de Python: ${data}`);
    });

    // Manejar los errores del script de Python
    pythonScript.stderr.on('data', (data) => {
        console.error(`Error en el script de Python: ${data}`);
    });

    // Finalizar la respuesta con un mensaje
    res.send('Archivo abierto desde el script de Python.');
});




//run server
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
});
