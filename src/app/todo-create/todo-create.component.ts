import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Constants } from '../constants';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {

  @ViewChild('todoCreateModel', { static: false })
  todoCreateModel: ModalDirective;

  tasks = 'Tasks';
  @Input()
  title: string = this.tasks;

  editIndex = -1;

  descriptionInput: string = null;
  selectColor: string = null;

  colorList = Constants.colourList;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.descriptionInput && this.selectColor) {
      this.searchTodo(this.title, { description: this.descriptionInput, color: this.selectColor });
      this.hidePopup();
    }
  }

  cancle() {
    this.editIndex = -1;
    this.descriptionInput = null;
    this.selectColor = null;
    this.title = this.tasks;
  }

  searchTodo(title: string, value: any) {
    if (title && value) {
      let todoList = this.todoService.getList();
      if (todoList) {
        let titleList = todoList.findIndex(l => l.title && l.title.toLowerCase() == title.toLowerCase());
        if (titleList >= -1) {
          if (this.editIndex === -1) {
            todoList[titleList].list.push(value);
          } else if (this.editIndex >= -1) {
            todoList[titleList].list[this.editIndex] = value;
          }
          this.todoService.create(todoList);
          this.todoService.refreshList();
        }
      }
    }
  }

  showPopup(todoEdit: any) {
    if (todoEdit) {
      this.editIndex = todoEdit.index;
      this.title = todoEdit.title;
      this.descriptionInput = todoEdit.item.description;
      this.selectColor = todoEdit.item.color;
    }
    this.todoCreateModel.show();
  }

  hidePopup() {
    this.cancle();
    this.todoCreateModel.hide();
  }
}
