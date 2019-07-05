import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newItemValue:string;
  editValue:string;
  items;
  errorMessage:string;
  constructor(public db:AngularFirestore,public globals:GlobalsService) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    this.globals.checkLoggedIn();
  }
  addItem = () => {
    this.errorMessage = null;
    const id = this.db.createId();
    this.db.collection('items').doc(id).set({id:id,value: this.newItemValue, done: false, edit: false, dateCreated: new Date()}).then(res => {
      this.newItemValue = null;
    });
  }
  doneItem = (id) => {
    this.errorMessage = null;
    let itemDone:boolean;
    this.db.collection('items').doc(id).get().subscribe(response => {
      itemDone = response.data().done;
      this.db.collection('items').doc(id).update({done:!itemDone});
    })
  }
  deleteItem = (id) => {
    this.db.collection('items').doc(id).delete().catch(err => {
      this.errorMessage = err.message;
    });
  }
  showEdit = (id) => {
    let itemEdit:boolean;
    this.db.collection('items').doc(id).get().subscribe(response => {
      itemEdit = response.data().edit;
      this.db.collection('items').doc(id).update({edit:!itemEdit});
    })
  }
  editItem = (id) => {
    this.db.collection('items').doc(id).update({value: this.editValue}).then(response => {
      this.editValue = null;
      this.showEdit(id);
    })
  }
}