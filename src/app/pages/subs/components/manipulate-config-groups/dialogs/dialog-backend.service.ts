import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {XrayOutboundClientConfig} from '@app/services/types/rdo/xray-outbound.rdo';
import {GroupRdo} from '@app/pages/subs/model/rdo/group.rdo';

interface CreateGroupDto {
  name: string;
  configs: string[];
}

interface CreateGroupRdo extends GroupRdo {
  configs: XrayOutboundClientConfig[],
}

@Injectable()
export class DialogBackendService {
  private http = inject(HttpClient);

  createGroup(payload: CreateGroupDto): Observable<CreateGroupRdo> {
    return this.http.post<CreateGroupRdo>(`groups`, payload);
  }

  deleteGroup(id: number) {
    return this.http.delete(`groups/${id}`);
  }

  refreshGroup(id: number) {
    return this.http.patch(`groups/${id}`, {});
  }
}
