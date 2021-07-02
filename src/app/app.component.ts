import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from './constants';
import { TodoService } from './service/todo.service';
import { TodoCreateComponent } from './todo-create/todo-create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-todo-app-angular';

  todoList = [];

  @ViewChild('todoCreate', { static: false })
  todoCreateComponent: TodoCreateComponent;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    const localStorageTodoList = this.todoService.getList();
    if (localStorageTodoList == null) {
      this.todoService.create(Constants.todoList);
      this.todoService.refreshList();
    } else {
      this.todoList = localStorageTodoList;
    }
    this.getTodoList();
  }

  getTodoList() {
    this.todoService.todoList$.subscribe(res => {
      this.todoList = res;
    });

    /* this.todoService.getServer().then(res => {
      console.log("res", res);
      this.todoList = res;
    }).catch(e => {}); */
  }

  onEditTodo(event) {
    // Show Popup
    if (event) {
      this.addTodoCreate(event);
    }
  }

  // Show Popup
  addTodoCreate(event: any = null) {
    this.todoCreateComponent.showPopup(event);
  }

}
