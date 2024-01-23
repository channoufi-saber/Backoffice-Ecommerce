import { Component, OnInit } from '@angular/core';
import { WebNotificationService } from 'src/app/services/web-notification.service';
import { NotificationModel } from 'src/app/models/notification-model';


@Component({
  selector: 'app-web-notification',
  templateUrl: './web-notification.component.html',
  styleUrls: ['./web-notification.component.css']
})
export class WebNotificationComponent implements OnInit {

  notification:any=new NotificationModel()

  constructor(private notificationService:WebNotificationService) { }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe({
      next:(notification:NotificationModel)=>{
        this.notification=notification
        const timeout:any=notification.timeout
        setTimeout(()=>{
          this.notification=null
        },timeout)
      }
    })
  }

}
