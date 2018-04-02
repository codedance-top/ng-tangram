import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import { join } from 'path';
import * as express from 'express';
import { Request, Response } from 'express';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
const { AppServerModuleNgFactory } = require('./app/app.server.module.ngfactory');

enableProdMode();

const config = require('../config.json');

const app = express();

const STATIC_DIR = join(process.cwd(), 'dist-docs/browser');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static(STATIC_DIR, { index: false }));

app.get('*', (req: Request, res: Response) => {
  res.render(join(STATIC_DIR, 'index'), { req: req, res: res });
});

app.listen(config.port, () => console.log(`server running`));
