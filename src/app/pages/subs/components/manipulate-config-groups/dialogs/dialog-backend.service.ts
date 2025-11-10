import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {XrayOutboundClientConfig} from '@app/pages/subs/model/rdo/xray/outbound';

interface CreateGroupDto {
  name: string;
  configs: string[];
}

interface CreateGroupRdo {
  id: number,
  name: string,
  configs: XrayOutboundClientConfig[],
}


@Injectable()
export class DialogBackendService {
  private http = inject(HttpClient);

  getGroups() {
    return this.http.get(`/groups`);
  }

  createGroup(payload: CreateGroupDto): Observable<CreateGroupRdo> {
    return this.http.post<CreateGroupRdo>(`groups`, payload);
  }

  deleteGroup(id: number) {
    return this.http.delete(`groups/${id}`);
  }

  refreshGroup(id: number) {
    return this.http.delete(`groups/${id}`);
  }
}
