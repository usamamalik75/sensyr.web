import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private subject = new Subject<any>();
  constructor() { }
  confirmThis(message: string, siFn: () => void, noFn: () => void) {
    this.setConfirmation(message, siFn, noFn);
  }
  setConfirmation(message: string, siFn: () => void, noFn: () => void) {
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      siFn:
        () => {
          that.subject.next();
          siFn();
        },
      noFn: () => {
        that.subject.next();
        noFn();
      }
    });

  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
