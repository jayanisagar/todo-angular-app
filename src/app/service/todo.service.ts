import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Constants } from '../constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todoList: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  todoList$: Observable<any> = this._todoList.asObservable();

  constructor(private storageService: StorageService) { }

  
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
}
