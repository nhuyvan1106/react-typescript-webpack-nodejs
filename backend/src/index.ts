import { App } from './App';

const PORT = process.env.PORT || 8092;

const APP = new App();

APP.start(PORT);