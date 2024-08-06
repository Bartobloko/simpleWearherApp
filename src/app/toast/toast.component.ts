import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastDataService } from '../shared/services/toast-data.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toasts: { message: string, type: string, timerId?: number }[] = [];
  private toastSub: Subscription = new Subscription();

  constructor(private toastService: ToastDataService) {}

  ngOnInit() {
    this.toastSub = this.toastService.toastChanged.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy() {
    this.toastSub.unsubscribe();
  }

  removeToast(toast: { message: string, type: string, timerId?: number }) {
    this.toastService.deleteToast(toast);
  }

}
