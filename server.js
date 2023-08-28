const express = require('express');
const app = express();
const port = 3000;

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

function validateHTTPMethods(req, res, next) {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validMethods.includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  next();
}

app.use(validateHTTPMethods);

app.use(express.json());

app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
