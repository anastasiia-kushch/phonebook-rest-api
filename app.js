import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import 'dotenv/config';
import './db/dbServer.js';
import path from 'node:path';

const app = express();

app.use('/avatars', express.static(path.resolve('public/avatars')));

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

app.listen(8558, () => {
  console.log('Server started on port 8558');
});
