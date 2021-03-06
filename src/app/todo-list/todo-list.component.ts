import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from '../constants';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input()
  title: string = null;

  @Input()
  list: any[] = [];

  @Output()
  onEditTodo = new EventEmitter<any>();

  isAddNewCard = false;
  descriptionInput: string = null;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  addNewCard() {
    this.isAddNewCard = true;
  }

  addCart() {
    const indexLength = Math.floor(Math.random() * Constants.colourList.length); 
    const selectColor = Constants.colourList[indexLength];
    if (this.descriptionInput && selectColor) {
      this.searchTodo(this.title, { description: this.descriptionInput, color: selectColor });
      this.cancle();
    }
  }

  cancle() {
    this.isAddNewCard = false;
    this.descriptionInput = null;
  }

  edit(item, index) {
    const obj = { title: this.title, item: item, index: index };
    this.onEditTodo.emit(obj);
  }

  delete(index) {
    if (index >= -1 && this.title) {
      let todoList = this.todoService.getList();
      if (todoList) {
        let titleList = todoList.findIndex(l => l.title && l.title.toLowerCase() == this.title.toLowerCase());
        if (titleList >= -1) {
          todoList[titleList].list.splice(index, 1);
          this.todoService.create(todoList);
          this.todoService.refreshList();
        }
      }
    }
  }

  searchTodo(title: string, value: any) {
    if (title && value) {
      let todoList = this.todoService.getList();
      if (todoList) {
        let titleList = todoList.findIndex(l => l.title && l.title.toLowerCase() == title.toLowerCase());
        if (titleList >= -1) {
          todoList[titleList].list.push(value);
          this.todoService.create(todoList);
          this.todoService.refreshList();
        }
      }
    }
  }

}
