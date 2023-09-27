const express = require('express');
const morgan = require('morgan');
const cookieParse = require('cookie-parser');
const connectDB = require('./db');
const validateToken = require('./middleware/validateToken');
const validateSchema = require('./middleware/validate');
const loginSchema = require('./schemas/login.schema');
const registerSchema = require('./schemas/register.schema');
const app = express()
require('dotenv').config();


const login = require("./routers/login");
const profile = require("./routers/profile");
const logout = require("./routers/logout");
const register = require("./routers/register");
const listViewRouter = require('./routers/list-view-router');
const listEditRouter = require('./routers/list-edit-router');

function validateHTTPMethods(req, res, next) {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validMethods.includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  next();
};

app.use(morgan('dev'));
app.use(cookieParse());
app.use(validateHTTPMethods);
app.use(express.json());


app.use("/api/login", validateSchema(loginSchema), login);
app.use("/api/profile", validateToken, profile);
app.use("/api/logout", logout);
app.use("/api/register", validateSchema(registerSchema), register);
app.use("/list-view", validateToken, listViewRouter);
app.use("/list-edit", validateToken, listEditRouter);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Servidor ON http://localhost:${process.env.PORT}`);
});
