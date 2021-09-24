import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../views/home/todoModel'; 

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = 'http://localhost:8080/todolist';

  constructor(private http: HttpClient) { }

  add(todo: Model): Observable<Model> {
    return this.http.post<Model>(this.baseUrl, todo);
  }

  findAll(): Observable<Model[]> {
    return this.http.get<Model[]>(this.baseUrl);
  }

  findById(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.baseUrl}/${id}`);
  }

  update(todo: Model): Observable<Model> {
    return this.http.put<Model>(`${this.baseUrl}/` + todo.id, todo);
  }

  delete(id: number): Observable<Model> {
    return this.http.delete<Model>(`${this.baseUrl}/` + id);
  }
}