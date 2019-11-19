import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as domino from 'domino';
import * as express from 'express';
import { join } from 'path';

/** 用来在服务器渲染时欺骗 codemirror */
const win = domino.createWindow();
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;

const { AppServerModule, ngExpressEngine } = require('./server/main');
const app = express();

const PORT = process.env.PORT || 8300;
const DOCS_FOLDER = join(process.cwd(), 'docs/browser');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

app.set('view engine', 'html');
app.set('views', DOCS_FOLDER);

app.get('*.*', express.static(DOCS_FOLDER, {
  maxAge: '1y'
}));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => console.log(`server running`));
