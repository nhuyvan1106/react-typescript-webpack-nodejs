import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as path from 'path';

const INSTANCE: express.Express = express();
const SERVER = http.createServer(INSTANCE);

export class App {
  constructor() {
    this._addMiddlewares();
    INSTANCE.get(['/'], (_, response) => response.sendFile(path.resolve(__dirname, 'index.html')));
  }

  private _addMiddlewares() {
    INSTANCE.use(bodyParser.json());
    INSTANCE.use(bodyParser.urlencoded({ extended: true }));
    INSTANCE.use((_, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    INSTANCE.use(express.static(path.resolve(__dirname)));
  }

  getServer(): http.Server {
    return SERVER;
  }

  start(port: string | number, cb?: () => void) {
    SERVER.listen(port, cb || (() => console.log(`Server started on port ${port}`)));
  }

}