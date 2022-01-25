import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Delifruit2';
  readonly VAPID_PUBLIC_KEY = "BJWFuB9pPM1qYpPPurWIr3ABmFhh2c1teSVMv1ZXKC06gcRMugkMc7Dc7rBo4oqkDhGnN1WWkvgmY_JVPnw1RHY";

  constructor(private swPush: SwPush, private pushService: PushNotificationService) {
    //this.subscribe()
  }
  subscribe(){
      this.swPush.requestSubscription({serverPublicKey: this.VAPID_PUBLIC_KEY,}).then(subscription => { 
        console.log(subscription)
          this.pushService.sendSubscriptionToTheServer({token: subscription}).subscribe({
            next:()=>{
              console.log("realizado")
            }, error:()=>{
              console.log("error")
            }
          })
        })
        .catch(console.error)
  }
}