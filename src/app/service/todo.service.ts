import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Constants } from '../constants';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = "http://localhost:3000/api/todo"
  private _todoList: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  todoList$: Observable<any> = this._todoList.asObservable();

  constructor(private storageService: StorageService,
    private httpClient: HttpClient) { }

  
  refreshList() {
    this._todoList.next(this.getList());
  }

  getList() {
    return this.storageService.read(Constants.StorageKeyTodo);
  }

  create(value: any) {
    return this.storageService.save(Constants.StorageKeyTodo, value);
  }

  edit(value: any) {
    return this.storageService.save(Constants.StorageKeyTodo, value);
  }

  delete() {
    return this.storageService.remove(Constants.StorageKeyTodo);
  }

  getServer(): Promise<any> {
    return this.httpClient.get(`${this.url}`).toPromise();
  }

  getIdServer(id: any): Promise<any> {
    return this.httpClient.get(`${this.url}/${id}`).toPromise();
  }

  postServer(value: any): Promise<any> {
    return this.httpClient.post(`${this.url}`, value).toPromise();
  }

  putServer(value: any, id: any): Promise<any> {
    return this.httpClient.put(`${this.url}/${id}`, value).toPromise();
  }

  patchServer(value: any, id: any): Promise<any> {
    return this.httpClient.patch(`${this.url}/${id}`, value).toPromise();
  }

  deleteServer(id: any): Promise<any> {
    return this.httpClient.delete(`${this.url}/${id}`).toPromise();;
  }
}
