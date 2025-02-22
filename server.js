const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configurar Multer para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Servir archivos estáticos
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin', '*');  // Permite acceso desde cualquier dominio
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');  // Métodos permitidos
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permite ciertos headers
    }
}));
