import express from 'express';
import taskRouter from './routes/taskRoutes.js';
import userRouter from './routes/userAuthRoutes.js';
import cors from 'cors';
import errorHandler from './error/errorHandler.js';
import connectDatabase from './config/dbConfig.js';
import config from './config/envConfig.js';
import loggerMiddleware from './middleware/loggerMiddleware.js';

const app = express();
const port = config.PORT;

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
