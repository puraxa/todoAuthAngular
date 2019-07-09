import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../globals.service';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { transition, trigger, style, state, animate } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    trigger('dropDown', [
      state('notDropped',style({
        height: '50px',
      })),
      state('dropped', style({
        height: '100px',
      })),
      transition('notDropped => dropped',[
        animate('1s'),
      ]),
      transition('dropped => notDropped', [
        animate('1s'),
      ])
    ]),
    trigger('leftRight',[
      state('left', style({
        left: '0'
      })),
      state('right', style({
        left: '-100%'
      })),
      transition('left => right',[
        animate('0.5s')
      ]),
      transition('right => left', [
        animate('0.5s')
      ])
    ]),
    trigger('upDown',[
      state('up',style({
        top: '-50px'
      })),
      state('down', style({
        top: '0px'
      })),
      transition('up => down' , [
        animate('0.6s')
      ]),
      transition('down => up' , [
        animate('0.6s')
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {
  leftRight = false;
  upDown = false;
  newItemValue:string;
  editValue:string;
  items;
  doneItems;
  errorMessage:string;
  mobile:boolean = false;
  constructor(public db:AngularFirestore,public globals:GlobalsService) {
    this.items = db.collection('items', ref => ref.orderBy('dateCreated','desc').where('done','==', false)).valueChanges();
    this.doneItems = db.collection('items',ref => ref.orderBy('dateCreated','desc').where('done' , '==', true)).valueChanges();
  }

  ngOnInit() {
    this.globals.checkLoggedIn();
    this.mobile = window.screen.width < 577;
  }
  move = () => {
    this.leftRight = !this.leftRight;
  }
  addItem = () => {
    this.upDown = false;
    this.errorMessage = null;
    const id = this.db.createId();
    this.db.collection('items').doc(id).set({id:id,value: this.newItemValue, done: false, edit: false, dateCreated: new Date()}).then(res => {
      this.newItemValue = null;
    }).catch(err => {
      this.errorMessage = err.message;
    });
  }
  doneItem = (id) => {
    this.errorMessage = null;
    this.upDown = false;
    let itemDone:boolean;
    this.db.collection('items').doc(id).get().subscribe(response => {
      itemDone = response.data().done;
      this.db.collection('items').doc(id).update({done:!itemDone});
    })
  }
  deleteItem = (id) => {
    this.upDown = false;
    this.db.collection('items').doc(id).delete().catch(err => {
      this.errorMessage = err.message;
      this.upDown = true;
    });
  }
  showEdit = (id) => {
    this.upDown = false;
    this.errorMessage = null;
    let itemEdit:boolean;
    this.db.collection('items').doc(id).get().subscribe(response => {
      itemEdit = response.data().edit;
      this.db.collection('items').doc(id).update({edit:!itemEdit});
    })
  }
  editItem = (id) => {
    this.upDown = false;
    this.errorMessage = null;
    this.db.collection('items').doc(id).update({value: this.editValue}).then(response => {
      this.editValue = null;
      this.showEdit(id);
    }).catch(err => {
      this.errorMessage = err.message;
    })
  }
  drop = (event: CdkDragDrop<any>, id) => {
    if(event.container != event.previousContainer){
      this.doneItem(event.item.element.nativeElement.id);
    }
  }

}