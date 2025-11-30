import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Observable} from 'rxjs';
import {environment} from '@constructor/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket({
      url: `${environment.apiXrayLogsUrl}/xray/logs/ws`,
      deserializer: (message) => message.data
    });
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }
}
