import marked from 'marked';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

// function clearHTML(text: string) {
//   return text.replace('', '');
// }

const DEFAULT_OPTION = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
}

@Injectable()
export class NtMarkdownService {

  private _renderer: marked.Renderer = new marked.Renderer();

  constructor(private http: HttpClient) {
    this.extendRenderer();
    this.setMarkedOptions({});
  }

  // get the content from remote resource
  getContent(path: string): Observable<any> {
    return this.http.get(path)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  get renderer() {
    return this._renderer;
  }

  // handle data
  extractData(res: HttpResponse<any>): string {
    return res.body || '';
  }


  setMarkedOptions(options: any) {
    options = { ...DEFAULT_OPTION, ...options };
    options.renderer = this._renderer;
    marked.setOptions(options);
  }

  // comple markdown to html
  compile(data: string) {
    return marked(data);
  }

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
