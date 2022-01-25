import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  SERVER_URL = 'https://bc2c-186-68-42-222.ngrok.io/save'

   constructor(private http: HttpClient) {}
  
    public sendSubscriptionToTheServer(subscription: any) {
      return this.http.post(this.SERVER_URL, subscription)
    }
}