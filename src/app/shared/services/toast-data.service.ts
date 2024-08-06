import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastDataService {

  constructor() { }

  toasts: { message: string, type: string, timerId?: number }[] = [];
  
  toastChanged = new Subject<{ message: string, type: string, timerId?: number }[]>();

  addToast(message: string, type: string) {
    const toast = { message, type };
    this.toasts.push(toast);
    // @ts-ignore
    toast.timerId = window.setTimeout(() => this.deleteToast(toast), 5000);
    this.toastChanged.next(this.toasts);
  }

  deleteToast(toast: { message: string, type: string, timerId?: number }) {
    const index = this.toasts.indexOf(toast);
    if (index !== -1) {
      if (toast.timerId) {
        window.clearTimeout(toast.timerId);
      }
      this.toasts.splice(index, 1);
      this.toastChanged.next(this.toasts);
    }
  }

}
