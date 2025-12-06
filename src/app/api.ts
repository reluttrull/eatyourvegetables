import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from './searchresult.interface';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = `${environment.apiUrl}/foods/search?api_key=${environment.apiKey}&pageSize=8&query=`;

  constructor(private http: HttpClient) { }

  searchFoods(query:string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.apiUrl}${query}`);
  }
}
