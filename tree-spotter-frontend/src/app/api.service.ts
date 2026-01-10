import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tree } from './models/tree';
import { Meadow } from './models/meadow';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getBasicMeadowInfo(): Observable<any> {
    return this.http.get('/api/meadows');
  }

  getTreesOfMeadow(meadowId: number): Observable<any> {
    return this.http.get(`/api/meadows/${meadowId}/trees`);
  }

  getMeadowById(id: number): Observable<any> {
    return this.http.get(`/api/meadows/${id}`);
  }

  getTreeById(id: number): Observable<any> {
    return this.http.get<Tree>(`/api/trees/${id}`);
  }

  insertMeadow(meadow: Meadow): Observable<any> {
    return this.http.post('/api/meadows', meadow);
  }

  insertTree(tree: Tree): Observable<any> {
    return this.http.post('/api/trees', tree);
  }

  deleteTree(treeId: number): Observable<any> {
    return this.http.delete(`/api/trees/${treeId}`);
  }

  deleteMeadow(meadowId: number): Observable<any> {
    return this.http.delete(`/api/meadows/${meadowId}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`/api/login`, { 'username': username, 'password': password });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`/api/register`, { 'username': username, 'password': password, 'email': email });
  }
}
