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

  login(username: string, password: string): Observable<any> {
    return this.http.post(`/api/login`, { 'username': username, 'password': password });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`/api/register`, { 'username': username, 'password': password, 'email': email });
  }

  deleteMeadow(meadowId: number): Observable<any> {
    return this.http.delete(`/api/meadows/${meadowId}`);
  }

  deleteTree(treeId: number): Observable<any> {
    return this.http.delete(`/api/trees/${treeId}`);
  }

  deleteTreeImage(imageId: number): Observable<any> {
    return this.http.delete(`/api/trees/images/${imageId}`);
  }

  getBasicMeadowInfo(): Observable<any> {
    return this.http.get('/api/meadows');
  }

  getMeadowById(id: number): Observable<any> {
    return this.http.get(`/api/meadows/${id}`);
  }

  getTreeById(id: number): Observable<any> {
    return this.http.get<Tree>(`/api/trees/${id}`);
  }

  getTreesOfMeadow(meadowId: number): Observable<any> {
    return this.http.get(`/api/meadows/${meadowId}/trees`);
  }

  getTreeImages(treeId: number): Observable<any> {
    return this.http.get(`/api/trees/${treeId}/images`);
  }

  insertMeadow(meadow: Meadow): Observable<any> {
    return this.http.post('/api/meadows', meadow);
  }

  insertTree(tree: Tree): Observable<any> {
    return this.http.post('/api/trees', tree);
  }

  updateMeadow(meadow: Meadow): Observable<any> {
    return this.http.put(`/api/meadows/${meadow.id}`, meadow);
  }

  updateTree(tree: Tree): Observable<any> {
    return this.http.put(`/api/trees/${tree.id}`, tree);
  }

  updateTreeImage(imageId: number, imageData: FormData): Observable<any> {
    return this.http.put(`/api/trees/images/${imageId}`, imageData);
  }

  uploadImage(treeId: number, imageData: FormData): Observable<any> {
    return this.http.post(`/api/trees/${treeId}/uploadImage`, imageData);
  }
}