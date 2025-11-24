import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket({
      url: 'ws://localhost:8400/xray/logs/ws',
      deserializer: (message) => message.data
    });
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }
}
