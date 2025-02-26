import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import { AppRouter } from './routes';
import { GlobalErrorHandler } from './middlewares/global-error-handler';
import { NotFound } from './middlewares/not-found';

// creating an instance of app
const app = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routers
app.use('/api/v1', AppRouter);

// root endpoint of the app
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is running at port ' + config.port,
    });
});

// global error handler
app.use(GlobalErrorHandler);

// Not found middleware
app.use(NotFound);

export default app;
