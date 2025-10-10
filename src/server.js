import express from 'express';
import dotenv from 'dotenv';
import taskRouter from './routes/taskRoutes.js';
import userRouter from './routes/userAuthRoutes.js';
import cors from 'cors';
import errorHandler from './error/errorhandler.js';
import connectDatabase from './dbConfig/dbConnection.js';
import loggerMiddleware from './middleware/loggerMiddleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/tasks', taskRouter);
app.use('/user', userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Listening on PORT : ${port}`);
});
