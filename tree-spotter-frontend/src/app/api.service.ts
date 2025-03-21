import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tree } from './models/tree';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getBasicMeadowInfo(): Observable<any> {
    return this.http.get('/api/meadows');
  }

  getMeadowById(id: number): Observable<any> {
    return this.http.get(`/api/meadows/${id}`);
  }

  getTreeById(id: number): Observable<any> {
    return this.http.get<Tree>(`/api/trees/${id}`);
  }
}
