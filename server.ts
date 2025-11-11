import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/db';
import authRoutes from './src/routes/authRoutes';
import categoryRoutes from './src/routes/categoryRoutes';
import serviceRoutes from './src/routes/serviceRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/services', serviceRoutes);

const PORT = process.env.PORT || 3000;  

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync();
    console.log('Database synchronized.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
})();