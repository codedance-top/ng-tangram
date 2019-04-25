import 'zone.js/dist/zone-node';
import * as domino from 'domino';
import * as express from 'express';
import { join } from 'path';

const win = domino.createWindow();
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

enableProdMode();

const app = express();

const PORT = process.env.PORT || 8300;
const DOCS_FOLDER = join(process.cwd(), 'docs');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DOCS_FOLDER, 'browser'));

app.get('*.*', express.static(join(DOCS_FOLDER, 'browser'), {
  maxAge: '1y'
}));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => console.log(`server running`));
