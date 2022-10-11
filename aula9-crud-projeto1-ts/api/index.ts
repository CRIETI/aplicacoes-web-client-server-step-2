import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import routes from './routes/index';
import db from './db/index';

const app: Express = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => 
{
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

app.use(routes);

app.use((req, res, next) => 
{
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () =>
{
  console.log(`Server started at http://localhost:${PORT}/`);
});
