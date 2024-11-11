 
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { KeyValue } from 'src/app/model/keyValue';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private summary = new Subject<KeyValue[]>();
  message$ = this.summary.asObservable();

  constructor() { }

  sendSummary(message: KeyValue[]) {
    this.summary.next(message);
  }
}
