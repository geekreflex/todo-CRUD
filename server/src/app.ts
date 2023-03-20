import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express, { Application } from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import { CommonRoutesConfig } from './modules/common/common.routes.config';
import { UserRoutes } from './modules/user/user.routes.config';
import { TodoRoutes } from './modules/todo/todo.routes.config';

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
  if ((global as any).it && typeof (global as any).it === 'function') {
    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}

export class App {
  private app: Application;
  private routes: Array<CommonRoutesConfig> = [];
  private server: http.Server;
  private debugLog: debug.IDebugger = debug('app');

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.server = http.createServer(this.app);
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(expressWinston.logger(loggerOptions));
  }

  private initializeRoutes() {
    const userRoutes = new UserRoutes();
    const todoRoutes = new TodoRoutes();
    this.routes.push(userRoutes);
    this.routes.push(todoRoutes);

    this.app.use(`/api/user`, userRoutes.router);
    this.app.use(`/api/todo`, todoRoutes.router);
  }

  public start(port: number) {
    this.server.listen(port, () => {
      this.debugLog(`Server listening on port ${port}`);
      this.routes.forEach((route: CommonRoutesConfig) => {
        this.debugLog(`Routes configured for ${route.getName()}`);
      });
    });
  }
}
