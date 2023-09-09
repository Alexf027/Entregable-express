const express = require('express');
const app = express();
require("dotenv").config();

const login = require("./routers/login")
const listViewRouter = require('./routers/list-view-router');
const listEditRouter = require('./routers/list-edit-router');

function validateHTTPMethods(req, res, next) {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validMethods.includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  next();
}

app.use(validateHTTPMethods);

app.use(express.json());

app.use("/login", login);
app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor ON ${process.env.PORT}`);
});
