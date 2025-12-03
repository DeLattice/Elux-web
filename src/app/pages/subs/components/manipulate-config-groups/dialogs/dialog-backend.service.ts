import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpStatusCode} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupRdo} from '@app/pages/subs/model/rdo/group.rdo';
import {UniqueXrayOutboundClientConfig} from '@app/services/types/rdo/xray-outbound.rdo';

interface CreateGroupDto {
  name: string;
  subscribeUrl?: URL;
}

interface CreateGroupRdo extends GroupRdo {
}

@Injectable()
export class DialogBackendService {
  private http = inject(HttpClient);

  createGroup(payload: CreateGroupDto): Observable<CreateGroupRdo> {
    return this.http.post<CreateGroupRdo>(`groups`, payload);
  }

  updateGroup(id: number, payload: CreateGroupDto) {
    return this.http.put(`groups/${id}`, payload);
  }

  deleteGroup(id: number) {
    return this.http.delete(`groups/${id}`);
  }

  refreshGroup(id: number) {
    return this.http.post(`groups/${id}/refresh`, {});
  }

  createConfigsForGroup(id: number, payload: string[]) {
    return this.http.post<UniqueXrayOutboundClientConfig[]>(`groups/${id}/configs`, payload);
  }

  deleteConfigById(id: number) {
    return this.http.delete<HttpStatusCode>(`groups/configs/${id}`)
  }
}
