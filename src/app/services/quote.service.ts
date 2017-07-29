import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Quote } from 'models';

@Injectable()
export class QuoteService {
  qod: string;

  constructor(private http: HttpClient) {}

  getQOD(): Observable<Quote> {
    return this.http
      .get('http://quotes.rest/qod.json?category=inspire')
      .map(data => {
        const quoteData = data['contents'].quotes[0];
        const { author, quote } = quoteData;
        const result = {
          author,
          quote,
        };
        return result;
      });
  }
}
