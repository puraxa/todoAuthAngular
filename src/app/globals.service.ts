import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  isAdmin:boolean;
  isLoggedIn:boolean = false;
  constructor() { }
}
