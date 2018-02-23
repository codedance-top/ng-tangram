import 'zone.js/dist/zone';
import 'reflect-metadata';

import 'prismjs/themes/prism.css';
import 'prismjs/prism';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

import 'nprogress/nprogress.css';
import 'themes/main.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppBrowserModule } from './app/app.browser.module';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppBrowserModule);
}

document.addEventListener('DOMContentLoaded', main, false);
