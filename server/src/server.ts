import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models';
import routes from './routes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/avatars', express.static(path.join(__dirname, '..', 'static', 'avatars')));
app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Подключение к БД успешно.');
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log(' Схема БД синхронизирована (alter: true)');
    }
    app.listen(PORT, () => {
      console.log(` Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error(' Ошибка при запуске:', error);
    process.exit(1);
  }
};

startServer();