import marked from 'marked';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { NtMarkdownEngine } from './markdown-engine';
import { NT_MARKED_OPTIONS } from './marked-engine-options';

@Injectable()
export class NtMarkedEngine implements NtMarkdownEngine {

  private _renderer = new marked.Renderer();

  get renderer() { return this._renderer; }

  constructor(
    private http: HttpClient,
    @Optional() @Inject(NT_MARKED_OPTIONS) options: marked.MarkedOptions = {}) {
    this.extendRenderer();
    this.setMarkedOptions(options);
  }

  // get the content from remote resource
  getContent(path: string): Observable<any> {
    return this.http.get(path).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // handle data
  extractData(res: HttpResponse<any>): string {
    return res.body || '';
  }

  setMarkedOptions(options: marked.MarkedOptions) {
    options.renderer = this._renderer;
    marked.setOptions(options);
  }

  // comple markdown to html
  compile(data: string) { return observableOf(marked(data)); }

  // handle error
  private handleError(error: HttpErrorResponse): any {
    let errMsg: string;
    if (error instanceof HttpResponse) {
      const body = error.body || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  // extend marked render to support todo checkbox
  private extendRenderer() {

    // this._renderer.image = function (href: string, title: string, text: string) {
    // 	return `<img href="${href}" alt="${title}">`;
    // };

    this._renderer.heading = function (text: string, level: number) {
      text = text.trim();
      return `<h${level} id="${text.replace(/\<a[^>]*?\>((.|\n)*?)\<\/a\>/g, '$1').replace(/ +/g, '-')}">
						${text}
					</h${level}>`;
    };

    this._renderer.listitem = function (text: string) {

      if (/^\s*\[[x ]\]\s*/.test(text)) {
        const checkedStyle = 'vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px;';
        text = text
          .replace(/^\s*\[ \]\s*/, `<input type="checkbox" style="${checkedStyle}" disabled>`)
          .replace(/^\s*\[x\]\s*/, `<input type="checkbox" style="${checkedStyle}" checked disabled>`);
        return `<li style="list-style: none">${text}</li>`;
      } else {
        return `<li>${text}</li>`;
      }
    };
  }
}
