const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./db');
const validateToken = require('./middleware/validateToken');
const validateSchema = require('./middleware/validate');
const loginSchema = require('./schemas/login.schema');
const registerSchema = require('./schemas/register.schema');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Solo se admiten imágenes JPEG o PNG'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5 MB
});

const app = express();
require('dotenv').config();

// Rutas
const login = require("./routers/login");
const verifyToken = require("./routers/verify");
const profile = require("./routers/profile");
const logout = require("./routers/logout");
const register = require("./routers/register");
const listViewRouter = require('./routers/list-view-router');
const listEditRouter = require('./routers/list-edit-router');

function validateHTTPMethods(req, res, next) {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    return res.status(400).json({ error: '🚫 Método HTTP no válido' });
  }
  next();
};

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(validateHTTPMethods);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.post('/uploads', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({ message: 'Imagen cargada con éxito', fileUrl });
});

app.get('/list-uploads', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send({
        message: "No se pudo acceder a la lista de archivos",
        error: err.message,
      });
    } 
    let fileUrls = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`);
    res.json(fileUrls);
  });
});

// Endpoints
app.use("/login", validateSchema(loginSchema), login);
app.use("/verify", verifyToken);
app.use("/profile", validateToken, profile);
app.use("/logout", logout);
app.use("/register", validateSchema(registerSchema), register);
app.use("/list-view", validateToken, listViewRouter);
app.use("/list-edit", validateToken, listEditRouter);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Servidor ON ✅🌐 http://localhost:${process.env.PORT}`);
});
