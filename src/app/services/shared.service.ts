import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFilter } from '../model/filter';
 

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private messageSource = new Subject<IFilter>();
  message$ = this.messageSource.asObservable();
 

  constructor() { }

  sendMessage(message: IFilter) {
    this.messageSource.next(message);
  }
}
