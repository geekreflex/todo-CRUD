import { App } from './app';

const app = new App();
const port: any = process.env.PORT || 8001;

app.start(port);
