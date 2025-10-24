import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroupDto} from './model/dto/group.dto';
import {Observable} from 'rxjs';
import {XrayOutboundClientConfig} from '@app/dashboard/model/rdo/xray/outbound';

@Injectable()
export class DialogBackendService {
  private http = inject(HttpClient);

  getGroups() {
    return this.http.get(`/groups`);
  }

  createGroup(name: string, payload: string): Observable<XrayOutboundClientConfig[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<XrayOutboundClientConfig[]>(`groups/${name}`, JSON.stringify(payload), {headers});
  }

  deleteGroup(name: string) {
    return this.http.delete(`groups/${name}`);
  }
}
