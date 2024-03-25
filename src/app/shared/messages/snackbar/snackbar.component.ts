import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { NotificationService } from "src/app/shared/messages/notification.service";
import { timer, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = '';
  snackVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifier.pipe(
      // primeiro cria uma mensagem e deixa visivel
      tap(message => {
        this.message = message;
        this.snackVisibility = 'visible';
      }),
      // muda todo o objeto dentro do tap para um observable timer/ sobreescreve, com isso ele dá um unsubscribe e cria um novo subscribe nesse observable
      switchMap(() => timer(3000))
      // quando acabar o tempo ele muda a visibilidade novamente
    ).subscribe(() => {
      this.snackVisibility = 'hidden';
    })
  }

  toggleSnack() {
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden';
  }
}
