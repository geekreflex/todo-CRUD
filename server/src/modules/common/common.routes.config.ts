import { Router } from 'express';

export abstract class CommonRoutesConfig {
  router: Router;
  name: string;

  constructor(name: string) {
    this.router = Router();
    this.name = name;
    this.configureRoutes();
  }

  getName(): string {
    return this.name;
  }

  abstract configureRoutes(): Router;
}
